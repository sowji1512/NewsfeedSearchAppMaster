import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Users } from 'src/models/Users';
import { RegisterserviceService } from '../registerservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = new Users();
  Form: FormGroup;
  error: any;
  error1: any;
  successful:string;
  title = 'Signup Page';
  submitted: boolean = false;
  success:boolean=false;
  constructor(private register: RegisterserviceService, private formBuilder: FormBuilder, private router: Router) {

    this.Form = this.formBuilder.group({
      Name: ['', Validators.required],
      EmailId: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(5)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  ngOnInit() {

  }
  get f() { return this.Form.controls; }
  onSubmit() {
    this.submitted = true;

    if (this.Form.invalid) {
      return;
    }
    else {

      if (this.f.Password.value === this.f.confirmpassword.value) {

        console.log(this.f.Password.value);
        console.log(this.f.confirmpassword.value);
        this.user.email = this.f.EmailId.value;
        this.user.name = this.f.Name.value;
        this.user.password = this.f.Password.value;
        this.user.roles = 1;
        this.register.register(this.user).subscribe(data => {
          console.log(data);
          alert("SignIn successful");
         this.successful="Signup successul"
      this.success=true;
          this.f.reset;

        },
          error => {
            this.error = error;

            if (this.error.status = 409) {
              console.log(this.error.error.error);
              alert(this.error.error.error);


            }
          });

      }

      else {
        this.error1 = "password and confirm password didnot match";
      }


    }


  }
  login() {
    this.router.navigate(['login']);
  }
  reset() {
    this.router.navigate(['']);
  }




}

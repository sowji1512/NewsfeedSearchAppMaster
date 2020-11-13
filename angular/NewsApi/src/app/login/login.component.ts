import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from 'src/models/login';
import { SignupStatus } from 'src/models/signupstatus';
import { RegisterserviceService } from '../registerservice.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenStorageService } from '../token-storage.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login Page';
  LoginForm: FormGroup;
  login1 = new Login();
  status = new SignupStatus();
  user: BigInteger;
  statusCreation: String;
  submitted: boolean = false;

  roles: string[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private registerservice: RegisterserviceService) {

    this.LoginForm = this.formBuilder.group({
      EmailId: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
    }
  }
  get f() { return this.LoginForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.LoginForm.invalid) {
      return;
    }
    else {
      this.login1.email = this.LoginForm.get('EmailId').value;
      this.login1.password = this.LoginForm.get('Password').value;
      this.registerservice.authenticate(this.login1).subscribe(data => {
        if (data.accessToken === null) {
          alert("U are not allowed to access this site");
          this.router.navigate(['login']);

        }
        else {
          this.tokenStorage.saveToken(data.accessToken);
          console.log(data.username);
          console.log(data.id);
          this.registerservice.userId = data.id;
          
          this.registerservice.userEmail = data.username;
        
          console.log(data.accessToken);
          this.tokenStorage.saveUserId(data.id);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);
          this.roles = this.tokenStorage.getAuthorities();
          this.registerservice.userId=this.tokenStorage.getUserId();
          if (this.registerservice.userEmail == "sowji1512@gmail.com") {
            alert("Successfully Logged In as an Admin");

            this.router.navigate(['admin']);
          }
          else {
            alert("Successfully Logged In as a User");
            this.router.navigate(['news']);
          }
        }
      },
        error => {
          console.log(error);
          alert("Invalid Credentials");
          this.router.navigate(['login']);
        });
    }
  }

  signup() {
    this.router.navigate(['']);
  }

  home() {
    this.router.navigate(['home']);
  }

}

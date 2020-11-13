import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpClientModule  } from '@angular/common/http';
import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterserviceService } from '../registerservice.service';
import { Users } from 'src/models/Users';



describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let registerservice:RegisterserviceService;
  let signup:Users


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent],
        imports:[FormsModule,ReactiveFormsModule,RouterTestingModule , HttpClientModule],
        providers:[RegisterserviceService]
  
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    registerservice = TestBed.get(RegisterserviceService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
  
  it('checking form valid or not', () => {
    expect(component.Form.valid).toBeFalsy();
  })

  it('checking formcontrols', () => {
    let Name= component.Form.controls["Name"];
    Name.setValue("sowji");
    let mailId= component.Form.controls["EmailId"];
    mailId.setValue("sowji1512@gmail.com");
    let  password= component.Form.controls["Password"];
    password.setValue("sowjanya");
    let  confirmpassword= component.Form.controls["confirmpassword"];
    confirmpassword.setValue("sowjanya");
    expect(component.Form.valid).toBeTruthy();
  })

  it('checking formcontrols with email Null', () => {
    let Name= component.Form.controls["Name"];
    Name.setValue("sowji");
    let mailId= component.Form.controls["EmailId"];
    mailId.setValue("");
    let  password= component.Form.controls["Password"];
    password.setValue("sowjanya");
    let  confirmpassword= component.Form.controls["confirmpassword"];
    confirmpassword.setValue("sowjanya");
    expect(component.Form.controls["EmailId"].valid).toBeFalsy();
  })


  it('password minlength ', () => {
    let Name= component.Form.controls["Name"];
    Name.setValue("sowji");
    let EmailId= component.Form.controls["EmailId"];
    EmailId.setValue("sowji1512@gmail.com");
    let  password= component.Form.controls["Password"];
    password.setValue("sow");
    let  confirmpassword= component.Form.controls["confirmpassword"];
    confirmpassword.setValue("sow");
    expect(component.Form.valid).toBeFalsy();
    expect(component.Form.controls["Password"].valid).toBeFalsy();
    expect(password.errors["required"]).toBeUndefined();
    expect(component.Form.controls["confirmpassword"].valid).toBeFalsy();
    expect(confirmpassword.errors["required"]).toBeUndefined();
  })

  it('form submit test',()=>{
    spyOn(component,'login').and.callFake(()=>{
      registerservice.register(signup);
    });
     let spy = spyOn(registerservice,'register');
    let name = component.Form.get('Name');
    name.setValue('sowjanya');
    let email = component.Form.get('EmailId');
    email.setValue('sowjanya@gmail.com');
    let password = component.Form.get('Password');
    password.setValue('sowji12');
    let confirmpassword = component.Form.get('confirmpassword');
    confirmpassword.setValue('sowji12');
    let form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

 
 




});

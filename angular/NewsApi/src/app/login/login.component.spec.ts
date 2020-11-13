import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule  } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';

import { RegisterserviceService } from '../registerservice.service';
import { Login } from 'src/models/login';
import { of } from 'rxjs';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let registerservice:RegisterserviceService;
let login:Login
  beforeEach(async(() => {
    TestBed.configureTestingModule({
     
      declarations: [LoginComponent],
      imports:[FormsModule,ReactiveFormsModule,RouterTestingModule , HttpClientModule],
      providers:[RegisterserviceService]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    registerservice = TestBed.get(RegisterserviceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form controls',()=>{
    let email = component.LoginForm.get('EmailId');
    email.setValue('');
    expect(email.valid).toBeFalsy();
    email.setValue('sowjanya@gmail.com');
    expect(email.valid).toBeTruthy();
    let password = component.LoginForm.get('Password');
    password.setValue('');
    expect(password.valid).toBeFalsy();
    password.setValue('sowji123');
    expect(password.valid).not.toBeFalsy();
  });
  it('form submit test',()=>{
   
      spyOn(component,'onSubmit').and.callFake(()=>{
        registerservice.authenticate(login);
      });
      let spy = spyOn(registerservice,'authenticate').and.returnValue(of(null));
      let email = component.LoginForm.get('EmailId');
      email.setValue('test@123.com');
      let password = component.LoginForm.get('Password');
      password.setValue('Test12345');
      let form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit',null);
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
   
  

  });

});

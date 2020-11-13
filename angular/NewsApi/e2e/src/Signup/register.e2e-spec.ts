import { browser, by, element, ExpectedConditions } from 'protractor';
import { RegisterPage } from '../Signup/register.po';
import { NewsPage } from '../Home/home.po';
import { SearchPage } from '../Search/search.po';
import { AdminPage } from '../admin/admin.po';
import { loginPage } from '../Login/login.po';


describe('workspace-project App', () => {
  let registerpage: RegisterPage;
  let newspage: NewsPage;
  let loginpage: loginPage;
  let searchpage:SearchPage;
  let adminpage:AdminPage;

  beforeEach(() => {
    registerpage = new RegisterPage();
    newspage = new NewsPage();
    loginpage = new loginPage();
    searchpage = new SearchPage();
    adminpage = new AdminPage();

    registerpage.navigateTo();
  });
  xit('should display welcome message', () => {
    expect(registerpage.getTitleText()).toEqual('Welcome to Signup Page!');
  });
  xit('should go to login page', () => {
    registerpage.gotoLoginPage().click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
  });


  it('Should display Error essage when Name and Email is null',function(){
  registerpage.setName().sendKeys('');
  registerpage.setEmail().sendKeys('');
  registerpage.setPassword().sendKeys('123456');
  registerpage.setConfirmPassword().sendKeys('123456');
  registerpage.rbtn().click();
  expect(registerpage.nameerror()).toEqual('Name is required');
  expect(registerpage.emailerror1()).toEqual('Email Id is required');

  });

  it('Should display Error essage when Email is Null',function(){
  registerpage.setName().sendKeys('Sowjanya');
  registerpage.setEmail().sendKeys('');
  registerpage.setPassword().sendKeys('123456');
  registerpage.setConfirmPassword().sendKeys('123456');
  registerpage.rbtn().click();
  expect(registerpage.emailerror1()).toEqual('Email Id is required');

  });
  it('Should display Error essage when Email Validation is required',function(){
  registerpage.setName().sendKeys('Sowjanya');
  registerpage.setEmail().sendKeys('sowjanya123789');
  registerpage.setPassword().sendKeys('123456');
  registerpage.setConfirmPassword().sendKeys('123456');
  registerpage.rbtn().click();
    expect(registerpage.emailerror2()).toEqual('Email Id validation is required');

  });
  

  it('Should display passwordError message when Password and confirm Password has less than 6 letters',function(){
  registerpage.setName().sendKeys('Sowjanya');
  registerpage.setEmail().sendKeys('sowjanya123789@gmail.com');
  registerpage.setPassword().sendKeys('1');
  registerpage.setConfirmPassword().sendKeys('12');
  registerpage.rbtn().click();
    expect(registerpage.passwordvalidation21()).toEqual('Password must be at least 6 characters');
    expect(registerpage.passwordvalidation22()).toEqual('Confirm Password must be at least 6 characters');

  });


  it('Should display passwordError message when Password and confirm Password didnt match',function(){
  registerpage.setName().sendKeys('Sowjanya');
  registerpage.setEmail().sendKeys('sowjanya123789@gmail.com');
  registerpage.setPassword().sendKeys('1234566');
  registerpage.setConfirmPassword().sendKeys('123456');
  registerpage.rbtn().click();
    expect(registerpage.checkpassword()).toEqual('password and confirm password didnot match');

  });

it('Should navigate to homepage after successful Signup', function () {
  var email=registerpage.getRandomString(10);
  registerpage.setName().sendKeys('Sowjanya');
  registerpage.setEmail().sendKeys(email+'@gmail.com');
  registerpage.setPassword().sendKeys('123456');
  registerpage.setConfirmPassword().sendKeys('123456');
  registerpage.rbtn().click();
  var timeoutInMilliseconds = 10000;
  browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
  var alert = browser.switchTo().alert();
  expect(alert.getText()).toEqual("SignIn successful");
  alert.accept();
  expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
});

it('Should stay in the same page after unsuccessful Signup', function () {
  registerpage.setName().sendKeys('sowji');
  registerpage.setEmail().sendKeys('sowjanya123789@gmail.com');
  registerpage.setPassword().sendKeys('123456');
  registerpage.setConfirmPassword().sendKeys('123456');
  registerpage.rbtn().click();
  var timeoutInMilliseconds = 10000;
  browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
  var alert = browser.switchTo().alert();
  expect(alert.getText()).toEqual("Email already exists!");
  alert.accept();
  expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/");
  expect(registerpage.getTitleText()).toEqual('Welcome to Signup Page!');
});


});

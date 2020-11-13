import { browser, by, element, ExpectedConditions } from 'protractor';
import { RegisterPage } from '../Signup/register.po';
import { NewsPage } from '../Home/home.po';
import { loginPage } from './login.po';
import { SearchPage } from '../Search/search.po';
import { AdminPage } from '../admin/admin.po';


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

  it('should go to News page after login as user with correct credentials', () => {
    registerpage.gotoLoginPage().click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
    loginpage.getLEmail().sendKeys('sowjanya123789@gmail.com');
    loginpage.getLPassword().sendKeys('123456');
    loginpage.getloginbtn().click();
    var timeoutInMilliseconds = 10000;
    browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Successfully Logged In as a User");
    alert.accept();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/news");
  });


  it('should go to Admin page after login as admin correct credentials', () => {
    registerpage.gotoLoginPage().click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
    loginpage.getLEmail().sendKeys('sowji1512@gmail.com');
    loginpage.getLPassword().sendKeys('123456');
    loginpage.getloginbtn().click();
    var timeoutInMilliseconds = 10000;
    browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Successfully Logged In as an Admin");
    alert.accept();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/admin");
  });


  it('should show alert message when blocked analyst tries to login', () => {
    registerpage.gotoLoginPage().click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
    loginpage.getLEmail().sendKeys('sowjanya@gmail.com');
    loginpage.getLPassword().sendKeys('123456');
    loginpage.getloginbtn().click();
    var timeoutInMilliseconds = 10000;
    browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("U are not allowed to access this site");
    alert.accept();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
  });

  it('should stay in same page when logged in with invalid credentials', () => {
    registerpage.gotoLoginPage().click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
    loginpage.getLEmail().sendKeys('sowjanya741@gmail.com');
    loginpage.getLPassword().sendKeys('123456');
    loginpage.getloginbtn().click();
    var timeoutInMilliseconds = 10000;
    browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Invalid Credentials");
    alert.accept();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
  });
});

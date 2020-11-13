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
  it(' Successful login as admin and search user', () => {
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
    expect(browser.getCurrentUrl()).toContain("admin");
    adminpage.searchAnalyst().sendKeys('manoj123@gmail.com');
    adminpage.submitSearch().click();
    expect(adminpage.viewSearch()).toContain("manoj123@gmail.com");


  });

  it('Successful login as admin and search user and can block them', () => {
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
    expect(browser.getCurrentUrl()).toContain("admin");
    adminpage.searchAnalyst().sendKeys('manoj123@gmail.com');
    adminpage.submitSearch().click();
    browser.sleep(2000);
    expect(adminpage.viewSearch()).toContain('manoj123@gmail.com');
    adminpage.blockmanoj123().click();
    var timeoutInMilliseconds = 10000;
    browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Blocked!");
    alert.accept();
    expect(adminpage.blockmanoj123().getAttribute('disabled')).toBe('true');

  });


});

import { browser, by, element, ExpectedConditions } from 'protractor';
import { RegisterPage } from './Signup/register.po';
import { NewsPage } from './Home/home.po';
import { loginPage } from './Login/login.po';
import { SearchPage } from './Search/search.po';
import { AdminPage } from './admin/admin.po';

xdescribe('workspace-project App', () => {
  let registerpage: RegisterPage;
  let newspage: NewsPage;
  let loginpage: loginPage;
  let searchpage:SearchPage;
  let adminpage:AdminPage;

  const pwd = {
    password: 'password',
    confirmpassword: 'confirmpassword'
  };

  beforeEach(() => {
    registerpage = new RegisterPage();
    newspage = new NewsPage();
    loginpage = new loginPage();
    searchpage = new SearchPage();
    adminpage = new AdminPage();

    registerpage.navigateTo();
  });
  it('should display welcome message', () => {
    expect(registerpage.getTitleText()).toEqual('Welcome to Signup Page!');
  });
  it('should go to News page after login as user with correct credentials', () => {
    registerpage.gotoLoginPage().click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
    loginpage.getLEmail().sendKeys('sowjanyaram@gmail.com');
    loginpage.getLPassword().sendKeys('123456');
    loginpage.getloginbtn().click();
    var timeoutInMilliseconds = 10000;
    browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Successfully Logged In as a User");
    alert.accept();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/news");
  });


  it('should go to Admin page after login as admin with correct credentials', () => {
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


  it('Should navigate to homepage after successful Signup', function () {
    registerpage.setName().sendKeys('Sowjanya');
    registerpage.setEmail().sendKeys('sowjanyam1512@gmail.com');
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
    registerpage.setEmail().sendKeys('sowjanyam1512@gmail.com');
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


  it(' Successful login as user and search articles ', () => {
    registerpage.gotoLoginPage().click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
    loginpage.getLEmail().sendKeys('sowjanyam1512@gmail.com');
    loginpage.getLPassword().sendKeys('123456');
    loginpage.getloginbtn().click();
    var timeoutInMilliseconds = 10000;
    browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Successfully Logged In as a User");
    alert.accept();
    expect(browser.getCurrentUrl()).toContain("news");
    newspage.searchText().sendKeys('Blackpink');
    newspage.submitSearch().click();
    expect(newspage.viewSearch()).toContain("Blackpink");    
  });

  it(' Successful login as user and view searched Article', () => {
    registerpage.gotoLoginPage().click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
    loginpage.getLEmail().sendKeys('sowjanyam1512@gmail.com');
    loginpage.getLPassword().sendKeys('123456');
    loginpage.getloginbtn().click();
    var timeoutInMilliseconds = 10000;
    browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Successfully Logged In as a User");
    alert.accept();
    expect(browser.getCurrentUrl()).toContain("news");
    newspage.searchText().sendKeys('Blackpink');
    newspage.submitSearch().click();
    var timeoutInMilliseconds = 10000;
    browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Articles  found");
    alert.accept();     
    newspage.clickSearchHistory().click();
    expect(newspage.viewSearchHistory()).toContain("Blackpink");
  });

  it(' Successful login as user and view search history', () => {
    registerpage.gotoLoginPage().click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
    loginpage.getLEmail().sendKeys('sowjanyam1512@gmail.com');
    loginpage.getLPassword().sendKeys('123456');
    loginpage.getloginbtn().click();
    var timeoutInMilliseconds = 10000;
    browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Successfully Logged In as a User");
    alert.accept();
    expect(browser.getCurrentUrl()).toContain("news");
    newspage.searchText().sendKeys('ufygufdhgd');
    newspage.submitSearch().click();
    var timeoutInMilliseconds = 10000;
    browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Articles not found");
    alert.accept();     
    newspage.clickSearchHistory().click();
    expect(newspage.viewSearchHistory()).toContain("ufygufdhgd");
  });


  it(' Successful login as user and delete search history', () => {
    registerpage.gotoLoginPage().click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
    loginpage.getLEmail().sendKeys('sowjanyam1512@gmail.com');
    loginpage.getLPassword().sendKeys('123456');
    loginpage.getloginbtn().click();
    var timeoutInMilliseconds = 10000;
    browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Successfully Logged In as a User");
    alert.accept();
    expect(browser.getCurrentUrl()).toContain("news");
    newspage.searchText().sendKeys('blackpink');
    newspage.submitSearch().click();
    var timeoutInMilliseconds = 10000;
    browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Articles  found");
    alert.accept();    
    newspage.clickSearchHistory().click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/searchHistory");
    expect(searchpage.viewSearchHistory()).toContain("blackpink");
    searchpage.deletesearch().click();
    expect(searchpage.deletesearch().isPresent()).toBe(false);

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

  it(' Successful login as admin and search user and can block them', () => {
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
    adminpage.blockmanoj123().click();
    var timeoutInMilliseconds = 10000;
    browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Blocked!");
    alert.accept();

  });

  it(' Successful login as admin and search user and can see whethet they are blocked using disabled button', () => {
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
    adminpage.blockmanoj123().click();
    expect(adminpage.blockmanoj123().getAttribute('disabled')).toBe("true");


  });
});

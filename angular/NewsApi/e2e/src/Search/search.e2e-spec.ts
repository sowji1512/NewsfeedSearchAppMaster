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

  it(' Successful login as user and view search history', () => {
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
    expect(browser.getCurrentUrl()).toContain("news");
        
    newspage.clickSearchHistory().click();
    expect(browser.getCurrentUrl()).toContain("searchHistory");
  });
  it(' Successful login as user and get alert based on search article', () => {
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
    loginpage.getLEmail().sendKeys('sowjanya123789@gmail.com');
    loginpage.getLPassword().sendKeys('123456');
    loginpage.getloginbtn().click();
    var timeoutInMilliseconds = 10000;
    browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Successfully Logged In as a User");
    alert.accept();
    expect(browser.getCurrentUrl()).toContain("news");
    newspage.searchText().sendKeys('sowjanya');
    newspage.submitSearch().click();
    var timeoutInMilliseconds = 10000;
    browser.wait(ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Articles  found");
    alert.accept();    
    newspage.clickSearchHistory().click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/searchHistory");
    expect(searchpage.viewSearchHistory()).toContain("sowjanya");
    searchpage.deletesearch().click();
    expect(searchpage.deletesearch().isPresent()).toBe(false);

  });

});

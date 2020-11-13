import { browser, by, element } from 'protractor';

export class loginPage {
 
  
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('h1')).getText();
  }
  getLEmail(){
    return element(by.css('#LEmail'));
  }
getLPassword(){
    return element(by.css('#Lpassword'));
}
getloginbtn(){
    
    return element(by.css('#loginbtn1'));

  }
  getsignupbtn(){
    
    return element(by.css('#regbtn'));

  }
}

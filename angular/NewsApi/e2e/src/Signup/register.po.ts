import { browser, by, element } from 'protractor';

export class RegisterPage {
  

 i:number=0
  navigateTo() {
    return browser.get('/');
  }


  getTitleText() {
    return element(by.css('h1')).getText();
  }

  setName(){
    return element(by.css('#name'));
  }
  setNvEmail(){
    return element(by.css('#email'));
  }

  setEmail(){
    return element(by.css('#email'));
  }
  setPassword(){
    return element(by.css('#password'));
    
  }
  setConfirmPassword(){
    return element(by.css(' #confirmpassword'));
    
  }
  setMatchedPassword(){
    return element(by.css('#password'));
    
  }
  setMatchedConfirmPassword(){
    return element(by.css(' #confirmpassword'));
    
  }
  emailerror1(){
    return element(by.css('#emailerror1')).getText();
    
  }
  nameerror(){
    return element(by.css('#nameerror')).getText();
    
  }
  emailerror2(){
    return element(by.css('#emailerror2')).getText();
    
  }
  rbtn(){
    
    return element(by.css(' #register'));

  }
  gotoLoginPage(){
    
    return element(by.css(' #login'));

  }

  passwordvalidation21(){
    return element(by.css('#pass21')).getText();
    
  }
  passwordvalidation22(){
    return element(by.css('#pass22')).getText();
    
  }
  checkpassword(){

    return element(by.css('#matchpassword')).getText();

  }
      

  getRandomString(length) {
   
    var string = '';
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' //Include numbers if you want
            for (this.i = 0; this.i < length; this.i++) {
                string += letters.charAt(Math.floor(Math.random() * letters.length));
            }
            return string;
        }
}

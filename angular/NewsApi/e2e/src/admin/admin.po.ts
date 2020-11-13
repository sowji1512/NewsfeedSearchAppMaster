import { browser, by, element } from 'protractor';

export class AdminPage {
  
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('h1')).getText();
  }
  searchAnalyst() {
    return element(by.id('search'));
  }
  submitSearch() {
    return element(by.id('searchSubmit'));
  }
  viewSearch() {
    return element(by.id('userEmail')).getText();
  }
  blockmanoj123(){
    return element(by.id('manoj123@gmail.com'))
  }
}

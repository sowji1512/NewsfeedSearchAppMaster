import { browser, by, element } from 'protractor';

export class SearchPage {
  
  navigateTo() {
    return browser.get('/');
  }

  viewSearchHistory(){
    return element.all(by.id('viewsearchhistory')).getText();
  }
  deletesearch(){
    return element(by.id('sowjanya'));

  }
}

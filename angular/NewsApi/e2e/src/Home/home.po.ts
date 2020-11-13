import { browser, by, element } from 'protractor';

export class NewsPage {
  
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('h1')).getText();
  }

  searchText() {
    return element(by.id('search'));
  }
  submitSearch() {
    return element(by.id('searchSubmit'));
  }
  viewSearch() {
    return element(by.className('card-header')).getText();
  }
  clickSearchHistory() {
    return element(by.id('searchhistory'));
  }
  viewSearchHistory(){
    return element.all(by.id('viewsearchhistory')).getText();
  }
}

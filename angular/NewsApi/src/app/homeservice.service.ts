import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Search } from 'src/models/Search';
import { Users } from 'src/models/Users';
import { News } from 'src/models/News';

@Injectable({
  providedIn: 'root'
})
export class HomeserviceService {

  api_key = '89830f2b03064fb59a9a5d60eb1e3842';
baseUrl:string='http://localhost:8598/'

  constructor(private http: HttpClient) {
    console.log("Insider HomeService constructor.");
  }

  initSources() {
    
    return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey=' + this.api_key);
  }

  initArticles() {
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=the-telegraph&apiKey=' + this.api_key);
  }

  searchArticles(searchKeyword) {

    return this.http.get('https://newsapi.org/v2/everything?q=' + searchKeyword + '&from=2019-02-12&sortBy=popularity&apiKey=' + this.api_key);
  }

  saveSearchedArticles(search: Search) {

    return this.http.post(this.baseUrl+"api/auth/saveSearches", search);
  }

  searchHistory(id: number) {

    return this.http.get<Search[]>(this.baseUrl+"api/auth/SearchList/" + id);
  }

  delete(id: number) {

    return this.http.delete(this.baseUrl+"api/auth/delete/" + id);
  }

  searchAnalyst(email: any) {

    return this.http.get<Users>(this.baseUrl+"api/admin/getAnalyst/" + email);
  }

  blackAnalyst(id: BigInteger) {

    return this.http.get(this.baseUrl+"api/admin/blacklist/" + id);
  }
  reactivateAnalyst(id: BigInteger){
    
    return this.http.get(this.baseUrl+"api/admin/reactivate/" + id);

  }

  getAllNewsAnalysts() {

    return this.http.get<Users[]>(this.baseUrl+"api/admin/getAllAnalysts");
  }


  

  addToFavourite(news) {
console.log(news);

    return this.http.post(this.baseUrl+"api/auth/addingFavourites",news);
  }
}

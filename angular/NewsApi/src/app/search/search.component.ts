import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeserviceService } from '../homeservice.service';
import { RegisterserviceService } from '../registerservice.service';
import { TokenStorageService } from '../token-storage.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchHistory: any;
  searchhistory: boolean = false;
  constructor(private newsapi: HomeserviceService,private tokenStorage: TokenStorageService, private registerservice: RegisterserviceService, private token: TokenStorageService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getSearchHistory();

  }

  deleteSearch(sid) {
    this.newsapi.delete(sid).subscribe(data => {
      this.searchHistory = data;
      console.log(this.searchHistory);
      this.getSearchHistory();

    });

  }
  getSearchHistory() {
    this.newsapi.searchHistory(this.tokenStorage.getUserId()).subscribe(data => {

      if (data.length === 0) {
        this.searchhistory = true;
      }
      else {
        this.searchhistory = false;
        this.searchHistory = data;
      }
      this.searchHistory = data;
      console.log(this.searchHistory);
    });
  }

  logout() {
    window.sessionStorage.clear();

    this.router.navigate(['login']);
  }


}

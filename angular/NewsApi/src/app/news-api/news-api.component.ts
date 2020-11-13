import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeserviceService } from '../homeservice.service';
import { TokenStorageService } from '../token-storage.service';
import { RegisterserviceService } from '../registerservice.service';
import { Search } from 'src/models/Search';
import { Users } from 'src/models/Users';
import { News } from 'src/models/News';

@Component({
	selector: 'app-news-api',
	templateUrl: './news-api.component.html',
	styleUrls: ['./news-api.component.css']
})
export class NewsApiComponent implements OnInit {
	user=new Users();
	form: FormGroup;
	news: Array<any>;
	mSources: Array<any>;
	searchkey: string;
	search = new Search();
	news1 = new News();
	searchHistory: any;
	searchPrevious: any;
	info: any;
	searchfound: string;
	status: boolean = false;
	articlesNotFound: boolean = false;
	searchhistory: boolean = true;
	constructor(private newsapi: HomeserviceService, private registerservice: RegisterserviceService,
		private token: TokenStorageService, private fb: FormBuilder, private router: Router) {
	}

	ngOnInit() {
	
	

		this.form = this.fb.group({
			search: ['', [Validators.required, Validators.minLength(2)]]
		});
		this.newsapi.initArticles().subscribe(data => {
			this.news = data['articles'];
			console.log(this.news);
		});
	}
	get f() { return this.form.controls; }

	onSearch() {
		
		this.user.email=this.token.getUsername();

		this.search.user = this.user;
		this.search.keyword = this.f.search.value;

		this.newsapi.searchArticles(this.f.search.value).subscribe(data => {

			if (data['articles'].length === 0) {
				alert("Articles not found");
				this.articlesNotFound = true;
				this.searchfound = "articles not found";
			}
			else {
				alert("Articles  found");
				this.articlesNotFound = false;
				this.searchfound = "articles found";

				this.news = data['articles'];
			}
		});
		this.newsapi.saveSearchedArticles(this.search).subscribe(data => {
		});
	}

	logout() {

		window.sessionStorage.clear();
		this.router.navigate(['login']);
	}
	

	addToFavourite(n){

		this.user.email=this.token.getUsername();
		this.news1=n;
		this.news1.user = this.user;
		
		this.newsapi.addToFavourite(this.news1).subscribe(data => {
		});
		

	}

	addToBookmark(n){

		console.log(n);
	}

}
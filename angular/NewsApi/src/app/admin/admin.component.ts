import { Component, OnInit } from '@angular/core';
import { HomeserviceService } from '../homeservice.service';
import { RegisterserviceService } from '../registerservice.service';
import { TokenStorageService } from '../token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/models/Users';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private newsapi: HomeserviceService, private fb: FormBuilder, private token: TokenStorageService) { }
  Myform: FormGroup;
  searchedAnalyst: boolean = false;
  user = new Users();
  user1: any;
  searchanalyst: boolean;
  block: boolean;
  newsAnalyst: any;
  searchAnalyst: any;


  ngOnInit() {
    this.searchanalyst = true;
    this.searchedAnalyst = false;
    console.log(this.token.getUsername());

    this.Myform = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.getNewsAnalysts();
  }

  onSearch() {
    console.log(this.f.search.value);

    this.searchAnalyst = this.f.search.value;

    this.newsapi.searchAnalyst(this.searchAnalyst).subscribe(data => {
      if (data === null) {
        this.searchedAnalyst = true;
      }
      else {
        this.user = data;
        this.user.activeStatus
        this.searchanalyst = false;
        this.searchedAnalyst = false;
      }

    });


  }
  get f() { return this.Myform.controls; }

  getNewsAnalysts() {
    this.newsapi.getAllNewsAnalysts().subscribe(data => {
      this.newsAnalyst = data;
  
      console.log(data);

    });
  }

  blackAnalyst(id) {
    this.newsapi.blackAnalyst(id).subscribe(data => {
      this.user1 = data;
      console.log(this.user1);
      alert("Blocked!");
      this.getNewsAnalysts();


    });
  }
  reactivateAnalyst(id) {
    this.newsapi.reactivateAnalyst(id).subscribe(data => {
      this.user1 = data;
      console.log(this.user1);
      alert("Reactivated!")
      this.getNewsAnalysts();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeserviceService } from '../homeservice.service';
import { RegisterserviceService } from '../registerservice.service';
import { TokenStorageService } from '../token-storage.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-newsanalysts',
  templateUrl: './newsanalysts.component.html',
  styleUrls: ['./newsanalysts.component.css']
})
export class NewsanalystsComponent implements OnInit {
  newsAnalyst: any;
  user1: any;
  constructor(private newsapi: HomeserviceService, private registerservice: RegisterserviceService, private token: TokenStorageService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getNewsAnalysts();
  }


  getNewsAnalysts() {
    this.newsapi.getAllNewsAnalysts().subscribe(data => {
      this.newsAnalyst = data;
      console.log(data);

    });
  }


  blackAnalyst(email) {
    this.newsapi.blackAnalyst(email).subscribe(data => {
      this.user1 = data;
      console.log(this.user1);

      alert("Blocked!");
      this.getNewsAnalysts();

    });
  }
}

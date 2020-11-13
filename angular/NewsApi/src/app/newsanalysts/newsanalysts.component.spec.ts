import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsanalystsComponent } from './newsanalysts.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HomeserviceService } from '../homeservice.service';
import { AdminnavbarComponent } from '../adminnavbar/adminnavbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('NewsanalystsComponent', () => {
  let component: NewsanalystsComponent;
  let fixture: ComponentFixture<NewsanalystsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsanalystsComponent,AdminnavbarComponent ],
      imports:[FormsModule,ReactiveFormsModule,RouterTestingModule , HttpClientModule],
      providers:[HomeserviceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsanalystsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

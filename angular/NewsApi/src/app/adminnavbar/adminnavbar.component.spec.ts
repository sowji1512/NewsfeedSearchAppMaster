import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminnavbarComponent } from './adminnavbar.component';
import { HomeserviceService } from '../homeservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AdminnavbarComponent', () => {
  let component: AdminnavbarComponent;
  let fixture: ComponentFixture<AdminnavbarComponent>;
  let service:HomeserviceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminnavbarComponent ],
      imports:[RouterTestingModule , HttpClientModule],
      providers:[HomeserviceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

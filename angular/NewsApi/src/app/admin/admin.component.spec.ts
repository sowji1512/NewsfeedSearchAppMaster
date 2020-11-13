import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { HomeserviceService } from '../homeservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { FilterPipe } from '../filter.pipe';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { AdminnavbarComponent } from '../adminnavbar/adminnavbar.component';
import { getMaxListeners } from 'cluster';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let homeService:HomeserviceService;
  let httpclient: HttpClientModule;
  let debugElement: DebugElement;
  let news:HomeserviceService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent,FilterPipe,AdminnavbarComponent ],
      imports:[FormsModule,ReactiveFormsModule,RouterTestingModule , HttpClientModule],
      providers:[HomeserviceService,FilterPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    news = debugElement.injector.get(HomeserviceService);
    homeService = TestBed.get(HomeserviceService);
    httpclient=TestBed.get(HttpClientModule);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find users',()=>{
    let spy = spyOn(homeService,'searchAnalyst');
    let form = fixture.debugElement.query(By.css('form'));
    let searched1 = component.Myform.controls['search'];
    searched1.setValue('test123@gmail.com'); 
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });


  it('should block users',()=>{
    spyOn(component,'blackAnalyst').and.callFake(()=>{
      homeService.blackAnalyst("sowjanya@getMaxListeners.com");
    });
    let spy = spyOn(homeService,'blackAnalyst').and.returnValue(of(true));
    component.blackAnalyst("sowjanya@getMaxListeners.com");
    expect(spy).toHaveBeenCalled();
  });


  it('should reactivate user users',()=>{
    spyOn(component,'reactivateAnalyst').and.callFake(()=>{
      homeService.reactivateAnalyst("sowjanya@getMaxListeners.com");
    });
    let spy = spyOn(homeService,'reactivateAnalyst').and.returnValue(of(true));
    component.reactivateAnalyst("sowjanya@getMaxListeners.com");
    expect(spy).toHaveBeenCalled();
  });
});

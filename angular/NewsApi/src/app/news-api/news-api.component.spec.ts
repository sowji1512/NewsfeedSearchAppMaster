import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NewsApiComponent } from './news-api.component';
import { HomeserviceService } from '../homeservice.service';
import { Search } from 'src/models/Search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('NewsApiComponent', () => {
  let component: NewsApiComponent;
  let fixture: ComponentFixture<NewsApiComponent>;
  let homeService:HomeserviceService;
  let search:Search;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsApiComponent ],
      imports:[FormsModule,ReactiveFormsModule,RouterTestingModule , HttpClientModule],
      providers:[HomeserviceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsApiComponent);
    component = fixture.componentInstance;
    homeService = TestBed.get(HomeserviceService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show searched data',()=>{
    let data = {
      news:['bts','shinee','blackpink'],
      totalResults:3
   };
   let spy = spyOn(homeService,'searchArticles').and.returnValue(of(data));
    spyOn(component,'onSearch').and.callFake(()=>{
      homeService.searchArticles([]);
      // component.news=data['news'];

    });
    let searched = component.form.get('search');
    searched.setValue('bts');
    let form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    expect(component.news.length).toEqual(3);
    expect(spy).toHaveBeenCalled();

  });

  it('should save searched data ',()=>{
    let data="articles found"
    spyOn(component,'onSearch').and.callFake(()=>{
      homeService.saveSearchedArticles(search)
    });
    let spy = spyOn(homeService,'saveSearchedArticles').and.returnValue(of(data));    
    let searched = component.form.get('search');
    searched.setValue('bts');
    let form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HomeserviceService } from '../homeservice.service';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let homeService:HomeserviceService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports:[FormsModule,ReactiveFormsModule,RouterTestingModule , HttpClientModule],
      providers:[HomeserviceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    homeService = TestBed.get(HomeserviceService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get searchistory',()=>{
    let searchhistory = ['bts','shinee','blackpink','exo'];
    spyOn(component,'getSearchHistory').and.callFake(()=>{
      homeService.searchHistory("sowjanya@123.com");
    });
    let spy = spyOn(homeService,'searchHistory').and.returnValue(of(searchhistory));
    component.getSearchHistory();
    expect(spy).toHaveBeenCalled();
  });

  it('should delete particular searchedword',()=>{

    spyOn(component,'deleteSearch').and.callFake(()=>{
      homeService.delete(12);
    });
     let spy = spyOn(homeService,'delete').and.returnValue(of(true));
     component.deleteSearch(12);
    expect(spy).toHaveBeenCalled(); 
  });
});

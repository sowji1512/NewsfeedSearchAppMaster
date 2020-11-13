import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { RegisterserviceService } from './registerservice.service';
import { HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NewsApiComponent } from './news-api/news-api.component';
import { HomeserviceService } from './homeservice.service';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';
import { AdminnavbarComponent } from './adminnavbar/adminnavbar.component';
import { NewsanalystsComponent } from './newsanalysts/newsanalysts.component';
import { FilterPipe } from './filter.pipe';
import { httpInterceptorProviders } from './auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
   LoginComponent,
   NewsApiComponent,
   SearchComponent,
   AdminComponent,
   AdminnavbarComponent,
   NewsanalystsComponent,
   FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
     HttpClientModule 
  ],
  providers: [RegisterserviceService,httpInterceptorProviders,HomeserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

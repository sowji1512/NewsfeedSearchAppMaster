import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsApiComponent } from './news-api/news-api.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';
import { NewsanalystsComponent } from './newsanalysts/newsanalysts.component';
import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  
  {
    path:'',
    component:SignupComponent
  },
  {
    path:'news',
    component:NewsApiComponent,
    canActivate:[AuthGuardGuard]
  },
   {
    path:'login',
    component:LoginComponent
  },
  {
    path:'searchHistory',
    component:SearchComponent,
    canActivate:[AuthGuardGuard]

  },
  {
    path:'admin',
    component:AdminComponent,
    canActivate:[AuthGuardGuard]

  },
  {
    path:'viewAnalysts',
    component:NewsanalystsComponent,
    canActivate:[AuthGuardGuard]


  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

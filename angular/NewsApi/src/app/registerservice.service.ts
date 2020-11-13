import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from 'src/models/Users';
import { Login } from 'src/models/login';
import { JwtResponse } from 'src/models/JwtResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterserviceService {
  http: HttpClient;
  userEmail: string;
  userId: number;

  baseUrl: string = 'http://localhost:8598/'

  constructor(h: HttpClient) {
    this.http = h;
  }

  public register(user: Users) {
    console.log(user.roles);
    return this.http.post(this.baseUrl + "api/auth/signup", user);
  }
  public authenticate(login: Login): Observable<JwtResponse> {

    return this.http.post<JwtResponse>(this.baseUrl + "api/auth/authenticate", login);


  }
}

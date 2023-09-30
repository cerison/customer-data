import { Injectable } from '@angular/core';
import { User } from './register/register.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credential } from './login/login.component';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  url: string = environment.API_URL

  constructor(private http: HttpClient) { }

  public addUser(data: User): Observable<User> {
    return this.http.post<User>(this.url + "/users", data.toJson());
  }

  public login(data: Credential): Observable<any> {
    return this.http.post<any>(this.url + "/login", data.toJson());
  }
}
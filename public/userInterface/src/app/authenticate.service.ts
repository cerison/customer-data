import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {

  authenticationStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  setToken(token: string) {
    localStorage.setItem("token", token);
    this.authenticationStatus.emit(this.isAuthenticated());
  }
  get token(): string {
    return localStorage.getItem("token") as string;
  }
  get name(): string {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(this.token).name;
  }

  isAuthenticated() {
    return (this.token) ? environment.BOOLEAN_TRUE : environment.BOOLEAN_FALSE
  }

  clear() {
    localStorage.clear();
    this.authenticationStatus.emit(this.isAuthenticated());
  }
}
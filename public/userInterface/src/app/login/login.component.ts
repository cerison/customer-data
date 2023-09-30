import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthenticateService } from '../authenticate.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

export class Credential {

  #username!: string;
  #password!: string;

  get username() {
    return this.#username;
  }
  get password() {
    return this.#password;
  }

  set username(username: string) {
    this.#username = username;
  }
  set password(password: string) {
    this.#password = password;
  }

  constructor(username: any, password: any) {
    this.username = username;
    this.password = password;
  }

  toJson() {
    return { username: this.#username, password: this.#password }
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private userService: UserService, private _router: Router, private authenticate: AuthenticateService) { }

  isUsername: string = environment.EMPTY_STRING;
  isPassword: string = environment.EMPTY_STRING;

  onSubmit(myForm: any) {
    if (myForm.value.username == environment.EMPTY_STRING) {
      this.isUsername = environment.IS_INVALID
    }

    if (myForm.value.password == environment.EMPTY_STRING) {
      this.isPassword = environment.IS_INVALID
    }

    if (myForm.value.username != environment.EMPTY_STRING && myForm.value.password != environment.EMPTY_STRING) {
      const user = new Credential(myForm.value.username, myForm.value.password);
      this.userService.login(user).subscribe({
        next: (token) => { this.setAuthenticate(token.token) },
        error: (err) => { this.setError(err) },
        complete: () => { }
      })
    }
  }

  setAuthenticate(token: string) {
    this.authenticate.setToken(token);
    this._router.navigate(["profiles"])
  }

  setError(err: any) {
    Swal.fire('Error!', err.error.message, 'error');
  }
}
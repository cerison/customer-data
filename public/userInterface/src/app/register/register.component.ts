import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

export class User {
  #name!: string;
  #username!: string;
  #password!: string;

  get name() {
    return this.#name;
  }
  get username() {
    return this.#username;
  }
  get password() {
    return this.#password;
  }
  set name(name: string) {
    this.#name = name;
  }
  set username(username: string) {
    this.#username = username;
  }
  set password(password: string) {
    this.#password = password;
  }
  constructor(name: any, username: any, password: any) {
    this.name = name;
    this.username = username;
    this.password = password;
  }

  toJson() {
    return { name: this.#name, username: this.#username, password: this.#password }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  constructor(private userService: UserService, private _router: Router) { }

  profileForm = new FormGroup({
    name: new FormControl(environment.EMPTY_STRING, [Validators.required]),
    username: new FormControl(environment.EMPTY_STRING, [Validators.required]),
    password: new FormControl(environment.EMPTY_STRING, [Validators.required]),
  });

  onSubmit() {
    const user = new User(this.profileForm.value.name, this.profileForm.value.username, this.profileForm.value.password)

    this.userService.addUser(user).subscribe({
      next: (user) => {
        this._router.navigate(["login"])
      },
      error: (err) => {
        Swal.fire('Error!', environment.ERROR_OCCURED, 'error');
      },
      complete: () => { }
    })
  }
}
import { Component } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})

export class ProfilesComponent {
  constructor(private authenticate: AuthenticateService, private _router: Router) { }

  name: string = this.authenticate.name;
  logout() {
    this.authenticate.clear();
    this._router.navigate(["login"])
  }
}

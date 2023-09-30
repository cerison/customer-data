import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private _router: Router, private authenticate: AuthenticateService) { }

  isLoggenIn: boolean = this.authenticate.isAuthenticated();

  ngOnInit(): void {
    this.authenticate.authenticationStatus.subscribe((status: boolean) => {
      this.isLoggenIn = status;
    });
  }

  goHome(): void {
    this._router.navigate(["home"])
  }
  onCustomers(): void {
    this._router.navigate(["customers"])
  }
  addCustomer(): void {
    this._router.navigate(["addCustomer"])
  }
  onRegister(): void {
    this._router.navigate(["register"])
  }
  onProfile(): void {
    this._router.navigate(["profiles"])
  }
  onLogin(): void {
    this._router.navigate(["login"])
  }
}
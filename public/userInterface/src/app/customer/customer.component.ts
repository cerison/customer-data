import { Component } from '@angular/core';
import { Customer } from '../customers/customers.component';
import { CustomerServiceService } from '../customer-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent {
  customer!: Customer;

  constructor(private route: ActivatedRoute, private customerService: CustomerServiceService, private _route: Router, private authenticate: AuthenticateService) {
    this.customer = new Customer(environment.EMPTY_STRING, environment.EMPTY_STRING, environment.EMPTY_STRING)
  }

  isLoggenIn: boolean = this.authenticate.isAuthenticated();

  ngOnInit(): void {
    const id = this.route.snapshot.params["customerId"]
    this.customerService.getCustomer(id).subscribe(cust => {
      this.customer = cust;
    })
  }

  deleteCustomer() {
    const id = this.route.snapshot.params["customerId"];
    this.customerService.deleteCustomer(id).subscribe({
      next: (customer) => {
        this.customer = customer;
        this._route.navigate(["customers"])
      },
      error: (err) => {
        Swal.fire('Error!', environment.ERROR_OCCURED, 'error');
      },
      complete: () => { }
    });
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomerServiceService } from '../customer-service.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  constructor(private customerService: CustomerServiceService, private _router: Router) { }

  profileForm = new FormGroup({
    name: new FormControl(environment.EMPTY_STRING, [Validators.required]),
    email: new FormControl(environment.EMPTY_STRING, [Validators.required, Validators.email]),
    items: new FormControl(environment.EMPTY_STRING, [Validators.required])
  });

  onSubmit() {
    let items: string[] = [];

    if (Array.isArray(this.profileForm.value.items)) {
      items = this.profileForm.value.items.filter(Boolean);
    }

    let transformedArr: object[] = items.map((item, index) => ({ id: index + environment.INITIAL, name: item }));

    const customer = {
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      orders: [{ items: transformedArr }]
    }

    this.customerService.addCustomer(customer).subscribe({
      next: (customer) => {
        this._router.navigate(["customers"])
      },
      error: (err) => {
        Swal.fire('Error!', environment.ERROR_OCCURED, 'error');
      },
      complete: () => { }
    })
  }
}
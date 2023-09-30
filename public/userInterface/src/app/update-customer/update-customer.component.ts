import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerServiceService } from '../customer-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../customers/customers.component';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})

export class UpdateCustomerComponent {
  customer!: Customer;

  constructor(private route: ActivatedRoute, private customerService: CustomerServiceService, private _router: Router) { }

  profileForm = new FormGroup({
    name: new FormControl(environment.EMPTY_STRING, [Validators.required]),
    email: new FormControl(environment.EMPTY_STRING, [Validators.required]),
    items: new FormControl([environment.EMPTY_STRING], [Validators.required])
  })

  ngOnInit(): void {
    const id: string = this.route.snapshot.params["customerId"];

    this.customerService.getCustomer(id).subscribe(cust => {
      this.customer = cust;
      let transformedArr: string[] = this.customer.orders[0].items.map((item: any) => (item.name));
      this.profileForm = new FormGroup({
        name: new FormControl(this.customer.name),
        email: new FormControl(this.customer.email),
        items: new FormControl(transformedArr)
      })
    })
  }

  onSubmit() {
    const id: string = this.route.snapshot.params["customerId"];

    let items: string[] = [];
    if (Array.isArray(this.profileForm.value.items)) {
      items = this.profileForm.value.items.filter(Boolean);
    }
    let transformedArr: object[] = items.map((item, index) => ({ id: index + environment.INITIAL, name: item }));

    let customer = {}
    if (this.profileForm.value.name) {
      customer = { ...customer, name: this.profileForm.value.name }
    }

    if (this.profileForm.value.email) {
      customer = { ...customer, email: this.profileForm.value.email }
    }

    if (items.length > 0) {
      customer = { ...customer, orders: [{ items: transformedArr }] }
    }

    this.customerService.updateCustomer(id, customer).subscribe({
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
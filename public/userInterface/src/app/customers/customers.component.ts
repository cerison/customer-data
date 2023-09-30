import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';
import { NavigationService } from '../navigation.service';
import { environment } from 'src/environments/environment.development';

export class Customer {
  #_id!: string;
  #name!: string;
  #email!: string;
  #orders!: [any];

  get _id() {
    return this.#_id;
  }
  get name() {
    return this.#_id;
  }
  get email() {
    return this.#_id;
  }
  get orders() {
    return this.#orders;
  }

  constructor(id: string, name: string, email: string) {
    this.#_id = id;
    this.#name = name;
    this.#email = email;
  }
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  counter: number = this.navigationService.getoffset()
  selectedCount: number = this.navigationService.getCount();
  query: string = environment.EMPTY_STRING;
  isError: string = environment.EMPTY_STRING;

  previsInvalid: boolean = environment.BOOLEAN_TRUE;
  nextisInvalid: boolean = environment.BOOLEAN_TRUE;

  constructor(private customerService: CustomerServiceService, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.loadCustomers()
  }

  private fillCustomer(customer: Customer[]) {
    this.customers = customer;
  }

  onChange(e: any) {
    this.navigationService.setCount(parseInt(e.target.value))
    this.navigationService.setoffset(environment.DEFAULT_ZERO)
    this.loadCustomers()
  }

  validateDate(value: string) {
    if (value !== environment.EMPTY_STRING) {
      const pattern = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
      if (pattern.test(value)) {
        this.isError = environment.EMPTY_STRING
      }
    }
  }

  filterDocument(value: string) {
    if (value === environment.EMPTY_STRING) {
      this.isError = environment.EMPTY_STRING
    } else {
      const pattern = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
      if (pattern.test(value)) {
        this.navigationService.setQuery(value)
        this.navigationService.setoffset(environment.DEFAULT_ZERO)
        this.loadCustomers()
      } else {
        this.isError = environment.IS_INVALID
      }
    }
  }

  prev() {
    this.navigationService.setoffset(this.navigationService.getoffset() - this.navigationService.getCount());
    this.loadCustomers()
  }

  next() {
    this.navigationService.setoffset(this.navigationService.getoffset() + this.navigationService.getCount());
    this.loadCustomers()
  }

  loadCustomers() {
    let data = {
      params: {
        offset: this.navigationService.getoffset(),
        count: this.navigationService.getCount(),
        name: this.navigationService.getQuery()
      }
    }

    this.customerService.getCustomers(data).subscribe(res => {
      this.fillCustomer(res)
    })

    this.navigationService.loadTotal().subscribe(total => {

      this.counter = this.navigationService.getoffset() + environment.DEFAULT_ONE;
      this.selectedCount = this.navigationService.getCount()
      this.query = this.navigationService.getQuery();

      if (this.navigationService.getoffset() == environment.DEFAULT_ZERO) {
        this.previsInvalid = environment.BOOLEAN_TRUE;
      } else {
        this.previsInvalid = environment.BOOLEAN_FALSE;
      }

      if ((this.navigationService.getoffset() + this.navigationService.getCount()) >= total || this.navigationService.getCount() >= total) {
        this.nextisInvalid = environment.BOOLEAN_TRUE;
      } else {
        this.nextisInvalid = environment.BOOLEAN_FALSE;
      }
    })
  }
}
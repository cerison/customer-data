import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './customers/customers.component';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class CustomerServiceService {
  url: string = environment.API_URL

  constructor(private http: HttpClient) { }

  public addCustomer(data: Object): Observable<Customer> {
    return this.http.post<Customer>(this.url + "/customers", data);
  }

  public getCustomers(data: object): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url + "/customers", data)
  }

  public getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(this.url + "/customers/" + id);
  }

  public updateCustomer(id: string, data: Object): Observable<Customer> {
    return this.http.patch<Customer>(this.url + "/customers/" + id, data);
  }

  public deleteCustomer(id: string): Observable<Customer> {
    return this.http.delete<Customer>(this.url + "/customers/" + id);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class NavigationService {

  url: string = environment.API_URL

  offset: number = environment.DEFAULT_OFFSET;
  count: number = environment.DEFAULT_COUNT;
  query: string = environment.EMPTY_STRING;

  constructor(private http: HttpClient) { }

  getoffset() {
    return this.offset
  }
  setoffset(offset: number) {
    this.offset = offset
  }

  getCount() {
    return this.count
  }
  setCount(count: number) {
    this.count = count
  }

  getQuery() {
    return this.query
  }
  setQuery(query: string) {
    this.query = query
  }

  public loadTotal(): Observable<number> {
    return this.http.post<number>(this.url + "/customers/count", { name: this.getQuery() });
  }
}
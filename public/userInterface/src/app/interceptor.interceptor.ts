import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticateService } from './authenticate.service';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private token: AuthenticateService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.attachToken(request));
  }

  attachToken(request: HttpRequest<any>) {
    const token = this.token.token;
    return request.clone({
      setHeaders: {
        Authorization: `${environment.BEARER} ${token}`
      }
    });
  }
}
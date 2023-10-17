import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorityService } from '../auth/authority.service';

@Injectable()
export class PublicEndpointSwitcherInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthorityService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/articles') && !this.auth.isLoggedin){
      console.debug("intercept : PublicEndpointSwitcherInterceptor");
      const x = request.clone({
        url: request.url.replace("/articles", "/public/articles")
      })
      console.log(x);
      return next.handle(x);
    }
    else return next.handle(request);
  }
}

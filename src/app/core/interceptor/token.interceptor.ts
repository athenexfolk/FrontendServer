import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../auth/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.tokenService.token) return next.handle(request);
    let authRequest = request.clone({
      setHeaders: {
        Authorization: `${this.tokenService.token.token_type} ${this.tokenService.token.access_token}`,
      },
    });
    return next.handle(authRequest);
  }
}

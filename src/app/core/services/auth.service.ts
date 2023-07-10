import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  map,
  shareReplay,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '/api/auth';
  private authToken$: BehaviorSubject<Token | null>;
  public isAuthenticated$: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.authToken$ = new BehaviorSubject(this.localToken);

    this.isAuthenticated$ = this.authToken$.pipe(
      map((token) => !!token),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }

  login(username: string, password: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let loginData = new URLSearchParams();

    loginData.append('grant_type', 'password');
    loginData.append('username', username);
    loginData.append('password', password);
    loginData.append('scope', 'offline_access openid profile email');

    this.http.post('/api/auth/token', loginData, { headers }).subscribe({
      next: (res) => {
        localStorage.setItem('betaToken', JSON.stringify(res));
        this.authToken$.next(this.localToken);
        this.router.navigate(['/']);
      },
      error: console.log,
    });
  }

  logout() {
    localStorage.clear();
    this.authToken$.next(null);
    this.router.navigate(['/']);
  }

  get localToken(): Token | null {
    let token = localStorage.getItem('betaToken');
    return !!token ? JSON.parse(token!) : null;
  }

  set localToken(token: Token | null) {
    localStorage.setItem('betaToken', JSON.stringify(token));
  }
}

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
}

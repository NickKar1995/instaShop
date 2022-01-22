import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../models/LogInResponse';

const loginUrl = 'https://frontend-2376.instashop.ae/api/users/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<LoginResponse>();

  constructor(private http: HttpClient, private router: Router) {}

  signup(username: string, password: string) {
    return this.http
      .post<LoginResponse>(loginUrl, {
        username: username,
        password: password,
      })
      .pipe(
        tap((responseData: LoginResponse) => {
          const user: LoginResponse = responseData;
          this.user.next(user);
        })
      );
  }

  logoutUser() {
    window.localStorage.clear();
    this.user.next({} as LoginResponse);
    this.router.navigate(['/']);
  }
}

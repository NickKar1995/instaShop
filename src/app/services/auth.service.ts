import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/LogInResponse';
const loginUrl = 'https://frontend-2376.instashop.ae/api/users/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(username: string, password: string) {
    return this.http.post<LoginResponse>(loginUrl, {
      username: username,
      password: password,
      // returnSecureToken:true
    });
  }
}

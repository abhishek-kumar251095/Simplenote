import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/users/';

  constructor(public http: HttpClient) { }

  register(userData: UserModel): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'register', userData);
  }

  login(userData: UserModel): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', userData);
  }
  
  saveTokenToLocalStorage(token: string): void {
    localStorage.setItem('auth-token', token);
  }

  saveUsernameToLocalStorage(username: string): void {
    localStorage.setItem('auth-username', username);
  }

  getToken(): string {
    return localStorage.getItem('auth-token');
  }

  getUsername(): string {
    return localStorage.getItem('auth-username');
  }

  getTokenDetails() {

    const token = this.getToken();

    if (token) {
      const payload = token.split('.')[1];
      const payLoadData = atob(payload);

      return JSON.parse(payLoadData);
    }

    return null;
  }

  isLoggedIn(): boolean {

    const tokenDetails = this.getTokenDetails();

    if(tokenDetails && tokenDetails.exp > Date.now()/1000) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.clear();
  }
}

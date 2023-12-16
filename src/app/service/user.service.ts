import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interface/login';
import { environment } from '../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tokenName = 'token';
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  
  login(username: string, password: string): Observable<any> {
    const apiUrl = `${environment.apiUrl}?path=login&username=${username}&password=${password}`;
    return this.http.get(apiUrl);
  }

  isLogin():boolean {
    if(localStorage.getItem(this.tokenName)) {
      return true
    }
    return false
  }

  logout() {
    localStorage.removeItem(this.tokenName);
    this.router.navigate(['/login'])
  }

  forwardToLogin() {
    this.router.navigate(['/login'])
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenName, token)
  }

  getToken():string {
    return localStorage.getItem(this.tokenName)||"";
  }
}
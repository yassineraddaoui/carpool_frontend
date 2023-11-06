import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { LoginRequest } from 'src/app/models/LoginRequest';
import { RegisterRequest } from 'src/app/models/RegisterRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://localhost:8089/api/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router) { }

  getRole() {
    const token = this.getToken();
    if (token) {
      let jwtData = token.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      return decodedJwtData.ROLES ;
    } else {
      console.error("Token is null.");
      return null; 
    }

  }
  register(user: RegisterRequest) {
    let api = `${this.endpoint}/register`;
    console.log(user);
    return this.http.post(api, user).subscribe({
      next:(res)=>this.router.navigateByUrl('/checkemail'),
      error: this.handleError.bind(this) //
   });
  }
  // Sign-in  
  login(user: LoginRequest) {
    return this.http
      .post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('first-name', res.firstName);
        localStorage.setItem('last-name', res.lastName);
        if (this.getRole() == 'PASSENGER')
          this.router.navigateByUrl('/user');
        else if (this.getRole() == 'DRIVER')
          this.router.navigateByUrl('/driver');
        else if (this.getRole() == 'ADMIN')
          this.router.navigateByUrl('/admin');
      }
      );
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    const removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('first-name');
    localStorage.removeItem('last-name');

    if (removeToken == null) {
      this.router.navigateByUrl('/login');
    }
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}

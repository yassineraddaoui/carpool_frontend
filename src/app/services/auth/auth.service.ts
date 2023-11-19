import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  throwError } from 'rxjs';
import { LoginRequest } from 'src/app/models/LoginRequest';
import { RegisterRequest } from 'src/app/models/RegisterRequest';
import {ResetPasswordRequest} from "../../models/ResetPasswordRequest";
import {ForgotPasswordRequest} from "../../models/ForgotPasswordRequest";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://localhost:8089/api/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private toastrService :ToastrService,private http: HttpClient, public router: Router) { }

  getRoles() {
    const token = this.getToken();
    if (token) {
      try {
        const jwtData = token.split('.')[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData = JSON.parse(decodedJwtJsonData);

        if (decodedJwtData && decodedJwtData.roles) {
          return decodedJwtData.roles;
        } else {
          console.error("Roles not found in decoded JWT data.");
          return null;
        }
      } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
      }
    } else {
      console.error("Token is null.");
      return null;
    }
  }

  register(user: RegisterRequest) {
    let api = `${this.endpoint}/register`;
    console.log(user);
    return this.http.post<any>(api, user).subscribe({
      next:(res)=>{
        this.toastrService.success(res.message);
        this.router.navigateByUrl('/login')
      },
      error:(err) => {
        this.toastrService.error("This email is already associated with an account");
        this.handleError.bind(this)
      ;} //
   });
  }
  // Sign-in
  login(user: LoginRequest) {
    return this.http
      .post<any>(`${this.endpoint}/login`, user)
      .subscribe({
        next: (res) => {
          if(res.token) {
            localStorage.setItem('access_token', res.token);
            localStorage.setItem('first-name', res.firstName);
            localStorage.setItem('last-name', res.lastName);
            this.toastrService.success(res.message);
            this.navigate();
          }
          },
        error: (err) => {
          this.toastrService.error("An error occurred");
        }
      });
  }

  navigate(){
    console.log(this.getRoles())
    debugger;
    if (this.getRoles().indexOf('PASSENGER') !=-1)
      this.router.navigateByUrl('/user');

    else if (this.getRoles().indexOf('DRIVER')!=-1)
      this.router.navigateByUrl('/driver');
    else if (this.getRoles().indexOf('ADMIN')!=-1)
      this.router.navigateByUrl('/admin');
  }

  forgotPassword(forgotPasswordRequest:ForgotPasswordRequest){
    return this.http.post<any>(`${this.endpoint}/forgot-password`,forgotPasswordRequest)
      .subscribe({
      next :(res) =>{         this.toastrService.success(res.message)},
        error: (err) => {
          this.toastrService.error("An error occurred");
        }    });
  }
  resetPassword(resetToken:string,resetPasswordRequest:ResetPasswordRequest){
    return this.http.patch<any>(`${this.endpoint}/reset-password/${resetToken}`,resetPasswordRequest)
      .subscribe({
        next :(res) =>{
          this.router.navigateByUrl('/login');
          console.log(res);
        },
        error: (err) => {
          this.toastrService.error("An error occurred");
        }    });
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null;
  }
  doLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('first-name');
    localStorage.removeItem('last-name');
    this.router.navigateByUrl('/login');
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

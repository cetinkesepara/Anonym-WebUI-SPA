import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { RegisterUser } from '../models/registerUser';
import { ErrorMessage } from '../models/errorMessage';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AlertifyService } from './alertify.service';

@Injectable()
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  TOKEN_KEY = 'token';
  path = 'https://localhost:44324/api/users/';
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  errorMessages: ErrorMessage[] = [];

  login(loginUser: LoginUser) {
    this.errorMessages = [];

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    this.httpClient
      .post(this.path + 'login', loginUser, {
        headers: headers,
        responseType: 'text',
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401) {
            this.errorMessages.push({
              name: 'NotAuthentication',
              type: 'warning',
              value: err.error.toString(),
            });
          }
          if (err.status == 400) {
            this.errorMessages.push({
              name: 'EmailConfirmation',
              type: 'warning',
              value: err.error.toString(),
            });
          }
          return throwError(new Error('Bir hata oluştu!'));
        })
      )
      .subscribe((data) => {
        let datas: any[] = JSON.parse(data);
        let token = JSON.stringify(datas['data']);
        let message = datas['message'];

        this.saveToken(token);
        this.userToken = token;

        this.decodedToken = this.jwtHelper.decodeToken(this.token);

        this.router.navigateByUrl('');
        this.alertifyService.success(message);
      });
  }

  register(registerUser: RegisterUser) {
    this.errorMessages = [];

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    this.httpClient
      .post(this.path + 'register', registerUser, {
        headers: headers,
        responseType: 'text',
      })
      .pipe(
        catchError((err) => {
          if (err.status == 400) {
            this.errorMessages.push({
              name: 'RegisterError',
              type: 'warning',
              value: err.error.toString(),
            });
          }
          return throwError(new Error('Bir hata oluştu!'));
          //return throwError(err);
        })
      )
      .subscribe((data) => {
        this.router.navigate(['girisyap'], {
          state: { data: data.toString() },
        });
      });
  }

  confirmationEmail(email: string): Observable<string> {
    this.errorMessages = [];

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.httpClient
      .post(this.path + 'confrimEmail', {email:email}, {
        headers: headers,
        responseType: 'text',
      })
      .pipe(
        catchError((err) => {
          if (err.status == 400) {
            this.errorMessages.push({
              name: 'EmailConfirmationError',
              type: 'warning',
              value: err.error.toString(),
            });
          }
          return throwError(new Error('Bir hata oluştu!'));
          //return throwError(err);
        })
      );
  }

  activateEmail(userId: string, token:string): Observable<string>{
    this.errorMessages = [];

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.httpClient
      .post(this.path + 'activatedEmail', {userId:userId, token:token}, {
        headers: headers,
        responseType: 'text',
      })
      .pipe(
        catchError((err) => {
          if (err.status == 400) {
            this.errorMessages.push({
              name: 'EmailActivateError',
              type: 'warning',
              value: err.error.toString(),
            });
          }
          return throwError(new Error('Bir hata oluştu!'));
          //return throwError(err);
        })
      );
  }

  getErrorMessages(): ErrorMessage[] {
    return this.errorMessages;
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  loggedIn() {
    if (this.token != null) {
      return tokenNotExpired(this.TOKEN_KEY, this.token);
    }
    return false;
  }

  get token() {
    let dataJson = JSON.parse(localStorage.getItem(this.TOKEN_KEY));
    if (dataJson == null) {
      return null;
    }
    return dataJson['token'].toString();
  }

  getCurrentUserId() {
    return this.jwtHelper.decodeToken(this.token).nameid;
  }
}

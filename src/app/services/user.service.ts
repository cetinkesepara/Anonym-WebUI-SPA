import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient, private router:Router) {}

  TOKEN_KEY = 'token';
  path = 'https://localhost:44324/api/users/';
  userToken: any;
  decodedToken: any;
  jwtHelper:JwtHelper = new JwtHelper();

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    this.httpClient
      .post(this.path + 'login', loginUser,
      {
        headers: headers,
        responseType: 'text',
      })
      .subscribe((data) => {
        this.saveToken(data);
        this.userToken = data;

        this.decodedToken = this.jwtHelper.decodeToken(this.token);

        this.router.navigateByUrl('');
      });
  }

  saveToken(token){
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut(){
    localStorage.removeItem(this.TOKEN_KEY);
  }

  loggedIn(){
    if(this.token != null){
      return tokenNotExpired(this.TOKEN_KEY, this.token);
    }
    return false;
  }

  get token() {
    let dataJson = JSON.parse(localStorage.getItem(this.TOKEN_KEY));
    if(dataJson == null){
      return null;
    }
    return dataJson["token"].toString();
  }

  getCurrentUserId(){
    return this.jwtHelper.decodeToken(this.token).nameid;
  }
}

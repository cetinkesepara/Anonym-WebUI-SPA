import { Component, OnInit } from '@angular/core';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { LoginUser } from '../../models/loginUser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ErrorMessage } from 'src/app/models/errorMessage';
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: SocialAuthService
  ) {
    if (this.isAuthenticated) {
      this.router.navigateByUrl('');
    }
  }

  faFacebook = faFacebook;
  faGoogle = faGoogle;
  loginUserForm: FormGroup;
  loginUser: LoginUser;
  socialUser: SocialUser;
  socialLoggedIn: boolean;
  success: string = null;
  errorMessages: ErrorMessage[] = [];

  ngOnInit() {
    if (history.state.data) {
      this.success = history.state.data;
    }
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  login() {
    if (this.loginUserForm.valid) {
      this.loginUser = Object.assign({}, this.loginUserForm.value);
      this.userService.login(this.loginUser);
      this.errorMessages = this.userService.getErrorMessages();
    }
  }

  loginWithFacebook() {
    this.loginSocial(FacebookLoginProvider.PROVIDER_ID);
  }

  loginWithGoogle(){
    this.loginSocial(GoogleLoginProvider.PROVIDER_ID);
  }

  loginSocial(providerId:string){
    this.authService.signIn(providerId).then((user) => {
      this.socialUser = user;
      this.socialLoggedIn = user != null;
      if (this.socialLoggedIn) {
        this.userService.loginWithSocial(this.socialUser);
      }
    });
  }

  get isAuthenticated() {
    return this.userService.loggedIn();
  }
}

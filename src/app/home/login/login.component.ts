import { Component, OnInit } from '@angular/core';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { LoginUser } from '../../models/loginUser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private userService:UserService, private router:Router) {
    if(this.isAuthenticated){
      this.router.navigateByUrl('');
    }
  }

  faFacebook = faFacebook;
  faGoogle = faGoogle;
  loginUserForm: FormGroup;
  loginUser:LoginUser;
  errors:string[] = [];

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern]],
      password: ['', Validators.required]
    });
  }

  login(){
    if(this.loginUserForm.valid){
      this.loginUser = Object.assign({}, this.loginUserForm.value);
      this.userService.login(this.loginUser);
      this.errors = this.userService.getErrorMessages();
    }
  }

  get isAuthenticated(){
    return this.userService.loggedIn();
  }
}

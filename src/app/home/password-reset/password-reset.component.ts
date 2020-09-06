import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ErrorMessage } from 'src/app/models/errorMessage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  providers: [UserService]
})
export class PasswordResetComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private userService:UserService, private formBuilder:FormBuilder, private router:Router) { 
    if(this.isAuthenticated){
      this.router.navigateByUrl('');
    }
  }

  errorMessages:ErrorMessage[] = [];
  successMessage:string = null;
  passwordResetForm:FormGroup;
  passwordReset:string;
  userId:string;
  token:string;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      this.userId = params["userId"];
      this.token = params["token"];
    }); 

    this.createPasswordResetForm();
  }

  createPasswordResetForm() {
    this.passwordResetForm = this.formBuilder.group({
      password: ['',[Validators.required, Validators.pattern]],
      confirmPassword: ['', Validators.required]
    },{validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g:FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { misMatch: true };
  }

  sendPasswordReset(){
    if(this.passwordResetForm.valid){
      this.passwordReset = this.passwordResetForm.get("password").value;
      this.userService.resetPasswordForForgetten(this.userId, this.token, this.passwordReset).subscribe(data =>{
        this.successMessage = data.toString();
      });
      this.errorMessages = this.userService.getErrorMessages();
    }
  }

  get isAuthenticated(){
    return this.userService.loggedIn();
  }
}

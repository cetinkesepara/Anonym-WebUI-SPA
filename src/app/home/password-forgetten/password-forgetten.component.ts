import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessage } from 'src/app/models/errorMessage';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-forgetten',
  templateUrl: './password-forgetten.component.html',
  styleUrls: ['./password-forgetten.component.scss'],
  providers: [UserService]
})
export class PasswordForgettenComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private userService:UserService, private router:Router) { 
    if(this.isAuthenticated){
      this.router.navigateByUrl('');
    }
  }

  passwordForgettenForm: FormGroup;
  passwordForgetten: string;
  errorMessages:ErrorMessage[] = [];
  successMessage:string;

  ngOnInit() {
    this.createPasswordForgettenForm();
  }

  createPasswordForgettenForm(){
    this.passwordForgettenForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern]]
    });
  }

  sendEmailForResetPassword(){
    if(this.passwordForgettenForm.valid){
      this.passwordForgetten = this.passwordForgettenForm.get("email").value;
      this.userService.forgettingPassword(this.passwordForgetten).subscribe((data)=>{
        this.successMessage = data.toString();
      });
      this.errorMessages = this.userService.getErrorMessages();
    }
  }

  get isAuthenticated(){
    return this.userService.loggedIn();
  }
}

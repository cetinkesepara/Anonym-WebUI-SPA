import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessage } from 'src/app/models/errorMessage';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
  providers: [UserService]
})
export class EmailConfirmationComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private userService:UserService, private router:Router) { 
    if(this.isAuthenticated){
      this.router.navigateByUrl('');
    }
  }

  emailConfirmationForm: FormGroup;
  emailConfirmation: string;
  errorMessages:ErrorMessage[] = [];
  successMessage:string;

  ngOnInit() {
    this.createEmailConfirmationForm();
  }

  createEmailConfirmationForm(){
    this.emailConfirmationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern]]
    });
  }

  confirmEmail(){
    if(this.emailConfirmationForm.valid){
      this.emailConfirmation = this.emailConfirmationForm.get("email").value;
      this.userService.confirmationEmail(this.emailConfirmation).subscribe((data)=>{
        this.successMessage = data.toString();
      });
      this.errorMessages = this.userService.getErrorMessages();
    }
  }

  get isAuthenticated(){
    return this.userService.loggedIn();
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UtilitiesService } from '../../services/utilities.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegisterUser } from 'src/app/models/registerUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService, UtilitiesService],
})
export class RegisterComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService
  ) {
    if (this.isAuthenticated) {
      this.router.navigateByUrl('');
    }
  }

  cities:string[] = [];
  registerUserForm: FormGroup;
  registerUser: RegisterUser;
  errors: string[] = [];

  ngOnInit() {
    this.cities = this.utilitiesService.getCitiesOfTurkey();

    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerUserForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', Validators.required],
      birthDay: ['', [Validators.required]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern]],
      password: [
        '',
        [Validators.required, Validators.pattern],
      ],
      confirmPassword: ['', Validators.required]
    },{validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g:FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { misMatch: true };
  }

  register(){
    if(this.registerUserForm.valid){
      this.registerUser = Object.assign({}, this.registerUserForm.value);
      this.userService.register(this.registerUser);
      this.errors = this.userService.getErrorMessages();
    }
  }

  get isAuthenticated() {
    return this.userService.loggedIn();
  }
}

import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { faPenSquare, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { InfoUser } from '../../models/infoUser';
import { AccountUser } from 'src/app/models/accountUser';
import { ErrorMessage } from 'src/app/models/errorMessage';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [UtilitiesService, UserService],
})
export class AccountComponent implements OnInit {
  constructor(
    private utilitiesService: UtilitiesService,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    if (!this.isAuthenticated) {
      this.router.navigateByUrl('');
    }
  }

  accountUser:AccountUser = new AccountUser();

  infoUserForm: FormGroup;
  infoUser: InfoUser = new InfoUser();

  usernameUserForm: FormGroup;
  usernameUser: string;

  passwordUserForm: FormGroup;
  passwordUser: string;

  faPenSquare = faPenSquare;
  faWindowClose = faWindowClose;
  cities: string[] = [];
  formNameEdit: boolean = false;
  formCityEdit: boolean = false;
  formGenderEdit: boolean = false;
  formBirthEdit: boolean = false;
  formPasswordEdit: boolean = false;
  formUserNameEdit: boolean = false;

  success: string = null;
  errorMessages: ErrorMessage[] = [];

  ngOnInit() {
    this.cities = this.utilitiesService.getCitiesOfTurkey();

    this.userService.getUserAccount().subscribe((data:AccountUser) => {
      this.accountUser = data;
      this.errorMessages = this.userService.getErrorMessages();
    });

    this.createAccountForms();
  }

  createAccountForms() {
    this.infoUserForm = this.formBuilder.group({
      name: [
        {
          value: "",
          disabled: true
        },
        [Validators.required, Validators.minLength(3)]
      ],
      city: [
        {
          value: "",
          disabled: true
        },
        [Validators.required]
      ],
      gender: [
        {
          value: "",
          disabled: true
        },
        [Validators.required]
      ],
      birthDay: [
        {
          value: "",
          disabled: true
        },
        [Validators.required]
      ]
    });

    this.usernameUserForm = this.formBuilder.group({
      userName: [
        {
          value: "",
          disabled: true,
        },
        [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern]
      ],
    });

    this.passwordUserForm = this.formBuilder.group({
      password: [
        {
          value: "",
          disabled: true,
        },
        [Validators.required, Validators.pattern]
      ],
    });
  }

  changeAccessibilityFormElement(
    formName: FormGroup,
    elementName: string,
    accessState: boolean
  ) {
    if (accessState) {
      formName.controls[elementName].enable();
    } 
    else {
      if(formName == this.infoUserForm || formName == this.usernameUserForm){
        formName.controls[elementName].setValue(this.accountUser[elementName]);
      }
      if(formName == this.passwordUserForm){
        formName.controls[elementName].setValue("");
      }

      formName.controls[elementName].disable();
    }
  }

  editFormValue(formElementName: string) {
    if (formElementName == 'name') {
      this.formNameEdit = !this.formNameEdit;
      this.changeAccessibilityFormElement(
        this.infoUserForm,
        formElementName,
        this.formNameEdit
      );
    }
    if (formElementName == 'city') {
      this.formCityEdit = !this.formCityEdit;
      this.changeAccessibilityFormElement(
        this.infoUserForm,
        formElementName,
        this.formCityEdit
      );
    }
    if (formElementName == 'gender') {
      this.formGenderEdit = !this.formGenderEdit;
      this.changeAccessibilityFormElement(
        this.infoUserForm,
        formElementName,
        this.formGenderEdit
      );
    }
    if (formElementName == 'birthDay') {
      this.formBirthEdit = !this.formBirthEdit;
      this.changeAccessibilityFormElement(
        this.infoUserForm,
        formElementName,
        this.formBirthEdit
      );
    }
    if (formElementName == 'password') {
      this.formPasswordEdit = !this.formPasswordEdit;
      this.changeAccessibilityFormElement(
        this.passwordUserForm,
        formElementName,
        this.formPasswordEdit
      );
    }
    if (formElementName == 'userName') {
      this.formUserNameEdit = !this.formUserNameEdit;
      this.changeAccessibilityFormElement(
        this.usernameUserForm,
        formElementName,
        this.formUserNameEdit
      );
    }
  }

  editFormIcon(formElementName: string) {
    if (formElementName == 'name') {
      return this.formNameEdit ? faWindowClose : faPenSquare;
    }
    if (formElementName == 'city') {
      return this.formCityEdit ? faWindowClose : faPenSquare;
    }
    if (formElementName == 'gender') {
      return this.formGenderEdit ? faWindowClose : faPenSquare;
    }
    if (formElementName == 'birthDay') {
      return this.formBirthEdit ? faWindowClose : faPenSquare;
    }
    if (formElementName == 'password') {
      return this.formPasswordEdit ? faWindowClose : faPenSquare;
    }
    if (formElementName == 'userName') {
      return this.formUserNameEdit ? faWindowClose : faPenSquare;
    }
  }

  updateUserInfo(){
    this.infoUser = Object.assign({}, this.infoUserForm.value);
    this.userService.updateUserInformation(this.infoUser);  
    this.errorMessages = this.userService.getErrorMessages();
  }

  updateUsername(){
    if(this.usernameUserForm.valid){
      this.usernameUser = this.usernameUserForm.get("userName").value;
      this.userService.updateUsername(this.usernameUser);
      this.errorMessages = this.userService.getErrorMessages();
    }
  }

  updatePassword(){
    if(this.passwordUserForm.valid){
      this.passwordUser = this.passwordUserForm.get("password").value;
      this.userService.updatePassword(this.passwordUser);
      this.errorMessages = this.userService.getErrorMessages();
    }
  }

  get isAuthenticated() {
    return this.userService.loggedIn();
  }
}

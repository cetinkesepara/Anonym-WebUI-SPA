import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavComponent } from './nav/nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { EmailActivateComponent } from './email-activate/email-activate.component';
import { PasswordForgettenComponent } from './password-forgetten/password-forgetten.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    NotFoundComponent,
    EmailConfirmationComponent,
    EmailActivateComponent,
    PasswordForgettenComponent,
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { EmailActivateComponent } from './email-activate/email-activate.component';

const routes: Routes = [
  {path: "", component:HomeComponent, children:[
    {path:"", component:MainComponent},
    {path:"girisyap", component:LoginComponent},
    {path:"kaydol", component:RegisterComponent},
    {path:"girisyap/eposta-dogrulama", component:EmailConfirmationComponent},
    {path:"activateEmail/:userId/:token", component:EmailActivateComponent},
    {path: '**', component:NotFoundComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: "", component:HomeComponent, children:[
    {path:"", component:MainComponent},
    {path:"girisyap", component:LoginComponent},
    {path:"kaydol", component:RegisterComponent},
    {path: '**', component:NotFoundComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

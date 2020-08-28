import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component';

const routes: Routes = [
  {path:"", component:AdminComponent,children:[
    {path:"", redirectTo: "login", pathMatch: "prefix"},
    {path:"login", loadChildren: ()=>import('./login/login.module').then(m=>m.LoginModule)},
    {path:"dashboard", loadChildren: ()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'admin', loadChildren: ()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  {path: '', loadChildren: ()=>import('./home/home.module').then(m=>m.HomeModule), pathMatch: 'full'},
  {path: '**', redirectTo:"",  pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

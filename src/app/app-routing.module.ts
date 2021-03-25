import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { TodoComponent} from './todo/todo.component';
import {AuthorizeGuardService as authGuard} from './authorize-guard.service';


const routes: Routes = [

  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'homepage',
    component:TodoComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

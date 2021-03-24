import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {MatInputModule} from '@angular/material/input';
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS,  } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { CookieModule } from 'ngx-cookie'

import {UniversalAppInterceptor} from './universal-app-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    CookieModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalAppInterceptor,
      multi: true
    }
    ],
  bootstrap: [AppComponent],

})
export class AppModule { }

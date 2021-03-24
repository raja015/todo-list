import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{AppCookieService} from '../app-cookie.service';

import {LoginService} from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private cookie:AppCookieService,private loginService :LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  username:string=null;
  password:string=null;

  loginSubmit(){
    console.log(this.username)
    if(this.username==null || this.password==null){
      alert("Cant be empty");
    }
    else{
      this.loginService.post(
        {
          name:this.username,
          password:this.password
        }
      ).subscribe(data=>{
        if(data.auth==true){
          this.cookie.set('token',data.token)
          console.log("set",data.token)

          this.router.navigate(['/homepage']);
          return;
        }


        // alert('not authorized');
        // console.log(data.auth)
      });

    }



    // this.cookie.set("token",token);
    this.username=null;
    this.password=null;

  }



}

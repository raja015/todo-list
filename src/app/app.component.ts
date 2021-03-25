import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router:Router){}
  title ='my todos';
  displayLogin:boolean=true;
  redirectToLoginPage(){
    this.displayLogin=false;
    this.router.navigate(['/login']);

  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe( 
      next  =>{
        console.log('logged in Successfully'),
        console.log(localStorage.getItem('Token'))
      }, 
      error => console.log('Eror while loggin in'),
    );
  }
  loggedIn() {
    const token = localStorage.getItem("Token");
    return !!token;
  }
  logOUt() {
    localStorage.removeItem("Token");
  }
}

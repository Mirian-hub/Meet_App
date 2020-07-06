import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {AlertService} from '../_services/alert.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public authService: AuthService, private alertService: AlertService) { }

  ngOnInit() {
  }

  login() {
    debugger;
    this.authService.login(this.model).subscribe( 
      next  =>{
        this.alertService.success('logged in Successfully')
      },
      error => this.alertService.error(error),
    );
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logOUt() {
    this.alertService.message('logged out !');
    localStorage.removeItem('Token');
  }
}

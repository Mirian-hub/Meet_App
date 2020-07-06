import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 

export class AppComponent implements OnInit {
  title = 'Meet Application';
  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService) {};
  ngOnInit() {
    // ---------------- Set Name to logged in User after refresh -------------
    const token = localStorage.getItem('Token');
    if(token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    // ------------------------------------------------------------------------
  }
}
 
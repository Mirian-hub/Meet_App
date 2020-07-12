import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {AlertService} from '../_services/alert.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private alertService: AlertService, private router: Router) {
  }
  canActivate(): boolean{
    if(this.authService.loggedIn()) {
      return true;
    }
     else {
       this.router.navigate(['/home']);
       this.alertService.error('Please, log in first !');
       return false;
     }
  }
}

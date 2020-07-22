import {Injectable} from '@angular/core';
import {User} from '../_models/user';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UserService} from '../_services/user.service';
import {AlertService} from '../_services/alert.service';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor (private userService: UserService, private router: Router, private alertify: AlertService) {}
    resolve(route: ActivatedRouteSnapshot): User | Observable<User> | Promise<User> {
        return this.userService.getUser(route.params['id']).pipe(
            catchError(error => {
                 this.alertify.error('Problem while getting data');
                 this.router.navigate(['/members']);
                 return of(null);
        }
           )
        )
    }
}
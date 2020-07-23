import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { timestamp } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotifiaction($event: any) {
      if(this.editForm.dirty){
        $event.returnValue = true;
      }
  }
  constructor(private route: ActivatedRoute, private alertify: AlertService, 
              private service: UserService, private authService: AuthService) { }

  ngOnInit() {
   this.route.data.subscribe(data => {
     this.user = data['user'];
   })
  }
  editUser() {
    console.log(this.user);
    this.service.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(
      next => {
        this.alertify.success(' User Profile updated Successfully');
        this.editForm.reset(this.user);
      },
      error => {this.alertify.error(error), console.log(error)}
    )
  }

}

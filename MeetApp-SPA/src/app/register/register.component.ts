import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {}
  @Output() cancelRegister = new EventEmitter();
  constructor(private authService: AuthService, private alertService: AlertService) { }

  ngOnInit() {
  }

  register () {
    this.authService.register(this.model).subscribe(
      () => this.alertService.success("registered successfully !"),
      (error) => this.alertService.error(error)
      );
      
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}

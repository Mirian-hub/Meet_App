import { Injectable } from '@angular/core';
import * as alert from 'alertifyjs';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

constructor() { }

confirm(message: string, okCallback: ()=> any) {
 alert.confirm(message, (e: any) => {
   if(e) {
     okCallback();
   } else{}
 })
};
  success(message: string) {
    alert.success(message);
  }
  error (message: string) {
    alert.error(message);
  }
  warning (message: string) {
    alert.warning(message);
  }
  message (message: string) {
    alert.message(message);
  }

}

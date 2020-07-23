import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {UserEditComponent} from '../members/user-edit/user-edit.component';
import { from } from 'rxjs'
@Injectable()

export class PreventUnsavedChanges implements CanDeactivate<UserEditComponent> {
  canDeactivate(component: UserEditComponent) {
      if(component.editForm.dirty) {
          return confirm('Sure to Close, Unsaved Changes will be lost')
      }
      return true;
  }
}
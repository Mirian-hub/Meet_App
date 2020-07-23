import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import {MatTabsModule} from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from './_services/auth.service';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import {ErrorInterceptorProvider} from './_services/error.intercepter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import {appRoutes} from './routes';
import {MemberCardComponent} from './members/member-card/member-card.component';
import {MemberDetailComponent} from './members/member-detail/member-detail.component';
import {MatIconModule} from '@angular/material/icon';
import {MemberDetailResolver} from './_resolvers/member-detail.resolver';
import {MemberListResolver} from './_resolvers/member-list.resolver copy';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import {UserEditComponent} from './members/user-edit/user-edit.component';
import {MemberEditResolver} from './_resolvers/member-edit.resolver copy';
import {PreventUnsavedChanges} from './_guards/unsaved_changes.guard';
export function tokenGetter() {
   return localStorage.getItem('Token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      RegisterComponent,
      HomeComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      UserEditComponent
   ],
   imports: [
      MatTabsModule,
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
           tokenGetter,
           whitelistedDomains: ['localhost:5000'],
           blacklistedRoutes: ['localhost:5000/api/auth'],
         }, 
       }),
       MatIconModule,
       NgxGalleryModule
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      PreventUnsavedChanges
   ],
   bootstrap: [
      AppComponent
   ],
   exports: [TabsModule
      ]
})
export class AppModule { }

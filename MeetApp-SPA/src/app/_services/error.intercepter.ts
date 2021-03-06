import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorIntercepter implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
          catchError( error => {
               debugger;
               if(error.status === 401) {
                   return throwError(error.statusText);
               }
               if(error instanceof HttpErrorResponse) {
                   const applicationError = error.headers.get('Application-Error');
                   if(applicationError) {
                       return throwError(applicationError);
                   }
                   const serverError = error.error;
                   let modalStateErrors = '';
                   if(serverError.errors && serverError.errors !== 'Object') {
                       for (const key in serverError.errors) {
                           if(serverError.errors[key]) {
                               modalStateErrors += serverError.errors[key] + '\n';
                           }
                       }
                   }
                   return throwError(modalStateErrors || serverError || 'Server Error (unknow error)');
               }
           }
          )
      )
  }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorIntercepter,
    multi: true
}

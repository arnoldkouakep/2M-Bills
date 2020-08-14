import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthenticationService} from '../services/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        // console.log('new', err.toString());
        console.error(err);
        if (err.status === 401 && !this.router.url.includes('login')) {
          this.clearSession();
        }
        // const error = err.error.message || err.statusText;
        const error = err || err.statusText;
        return throwError(error);
      }),
      // tap((event: HttpEvent<any>) => {
      //     if (event instanceof HttpResponse && (event.status === 201 || event.status === 201)) {
      //         console.log('Object created.');
      //     }
      // })
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log(event);
          // console.log(event.status);
          // console.log(event.headers.get('authorization'));
          if (event.headers.get('authorization') != null && (event.status === 200 || event.status === 201)) {
            this.reNewToken(event.headers.get('authorization'));
          }
          // if (event.headers.get('new-token') != null) {
          // }
        }
        return event;
      })
    );
  }

  clearSession() {
    // this.authSource.next(this.auth);
    localStorage.removeItem('authDBF');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login/renew-session']);
  }

  reNewToken(token) {
    console.log('test', token);
    // localStorage.removeItem('authDBF');
    // localStorage.setItem('authDBF', 'Bearer ' + token);
    localStorage.setItem('authDBF', token);
  }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('authDBF')) {
      // logged in so return true
      console.log('authDBF est active.');
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']); // , { queryParams: { returnUrl: state.url } });
    return false;
  }
}

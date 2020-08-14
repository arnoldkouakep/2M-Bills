import {LoginComponent} from './login/login.component';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'login/forgotten-password', component: LoginComponent},
  {path: 'login/otp-login', component: LoginComponent},
  {path: 'login/reset-password', component: LoginComponent},
  {path: 'login/renew-session', component: LoginComponent}
];

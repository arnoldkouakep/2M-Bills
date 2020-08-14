import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

import {AuthGuard} from '../shared/helpers/guards/auth.guard';
import {NavireComponent} from './navire/navire.component';
import {DossierComponent} from './dossier/dossier.component';
import {ClientComponent} from './dossier/client/client.component';

export const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'dossier', component: DossierComponent, canActivate: [AuthGuard]},
  {path: 'dossier/client', component: ClientComponent, canActivate: [AuthGuard]},
  {path: 'navire', component: NavireComponent, canActivate: [AuthGuard]},
  // { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  // { path: 'settings', component: ParametersComponent, canActivate: [AuthGuard] },
  // { path: 'user-parameters', component: UserProfileComponent, canActivate: [AuthGuard] },
  // { path: 'user-parameters/reset-password', component: UserProfileComponent, canActivate: [AuthGuard] },
  // { path: 'card', component: CardComponent,canActivate: [AuthGuard]  },

  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

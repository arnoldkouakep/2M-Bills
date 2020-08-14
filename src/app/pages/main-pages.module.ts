import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardComponent} from './dashboard/dashboard.component';

import {routes} from './main-pages.routing';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NavireComponent} from './navire/navire.component';
import {DossierComponent} from './dossier/dossier.component';
import {ClientComponent} from './dossier/client/client.component';
import {SearchComponent} from './components/modal/search/search.component';

// import { ChangeUserPasswordComponent } from './user-profile/change-user-password/change-user-password.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    DashboardComponent,
    NavireComponent,
    DossierComponent,
    ClientComponent,
    SearchComponent,
  ],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],

  entryComponents: [],

  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MainPagesModule {
}

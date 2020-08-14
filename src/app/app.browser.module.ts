import {BrowserTransferStateModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
// used to create fake backend
// import { fakeBackendProvider } from './core/helpers/fake-backend';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AuthModule} from './auth/auth.module';
import {MainPagesModule} from './pages/main-pages.module';
import {SharedModule} from './shared/shared.module';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppModule} from './app.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    AuthModule,
    MainPagesModule,
    SharedModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    AppModule,
    BrowserTransferStateModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true
    // },
    // provider used to create fake backend
    // fakeBackendProvider
  ],

  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})

export class AppBrowserModule {
}

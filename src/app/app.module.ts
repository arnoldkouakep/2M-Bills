import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {CommonModule, DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {SidebarComponent} from './pages/components/sidebar/sidebar.component';
import {HeaderComponent} from './pages/components/header/header.component';
import {SharedModule} from './shared/shared.module';
import {HttpLoaderFactory, MainPagesModule} from './pages/main-pages.module';
import {AuthModule} from './auth/auth.module';
import {JwtInterceptor} from './shared/helpers/jwt.interceptor';
import {UserIdleModule} from 'angular-user-idle';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    // BrowserModule,
    // AppRoutingModule,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AuthModule,
    MainPagesModule,
    SharedModule,
    // Optionally you can set time for `idle`, `timeout` and `ping` in seconds.
    // Default values: `idle` is 600 (10 minutes), `timeout` is 300 (5 minutes)
    // and `ping` is 120 (2 minutes).
    // UserIdleModule.forRoot({ idle: 20, timeout: 20, ping: 20 }),
    UserIdleModule.forRoot({idle: 600, timeout: 300, ping: 120}),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    CommonModule,
    HttpClientModule
  ],
  providers: [

    {provide: LocationStrategy, useClass: HashLocationStrategy},
    // EmfServiceService,
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
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
export class AppModule {
}

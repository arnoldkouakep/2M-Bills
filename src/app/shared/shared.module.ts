import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {OrderByPipe} from './utils/order-by.pipe';
import {RowFilterPipe} from './utils/row-filter.pipe';
import {DateConvertPipe} from './utils/date-convert.pipe';
import {MDBBootstrapModule, MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {Title} from '@angular/platform-browser';
import {AuthGuard} from './guards/auth.guard';
import {PageTitleService} from './services/page-title.service';
import {ChartsModule} from 'ng2-charts';
// import { AgmCoreModule } from '@agm/core';
// import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import {ToastrModule} from 'ngx-toastr';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {UserService} from './services/user.service';
import {AuthenticationService} from './services/auth.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthInterceptor} from './helpers/auth.interceptor';
import {StatusBackendPipe} from './utils/status-backend.pipe';
import {NumberSeparatorPipe} from './utils/number-separator.pipe';

@NgModule({
  declarations: [
    DateConvertPipe,
    RowFilterPipe,
    OrderByPipe,
    StatusBackendPipe,
    NumberSeparatorPipe
  ],
  imports: [
    CommonModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    FontAwesomeModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    AngularMultiSelectModule,
    FormsModule,
    // AgmCoreModule.forRoot({
    //   // please get your own API key here:
    //   // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
    //   apiKey: 'AIzaSyAJg2HLOhTmPcU8jSVaBr4W1hrUiTlwYWs'
    // }),
    // AgmSnazzyInfoWindowModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  exports: [
    DateConvertPipe,
    RowFilterPipe,
    StatusBackendPipe,
    NumberSeparatorPipe,
    OrderByPipe,
    CommonModule,
    ChartsModule,
    AngularMultiSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    FontAwesomeModule,
    MDBBootstrapModule,
    // AgmCoreModule,
    Ng2SmartTableModule,
    ToastrModule
  ],
  providers: [
    Title,
    AuthGuard,
    MDBModalRef,
    AuthenticationService,
    UserService,
    PageTitleService,
    MDBModalService,
    NumberSeparatorPipe,
    StatusBackendPipe,
    DecimalPipe,
    {
      provide: LOCALE_ID,
      useValue: 'fr' // 'de' for Germany, 'fr' for France ...
    },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
})

export class SharedModule {
}

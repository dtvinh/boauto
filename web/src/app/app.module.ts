import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageContentComponent } from './layout/page-content/page-content.component';

import { authInterceptorProviders } from 'src/_helpers/auth.interceptor';

import {
  GuestLayoutComponent,
  GuestFooterComponent
} from  './layout/guest';

import {
  AuthorizedLayoutComponent,
  AuthorizedNavbarComponent,
  AuthorizedAsideComponent,
  AuthorizedFooterComponent
} from './layout/authorized';

import {
  TradingAccountInfoComponent,
  TradingAccountSettingComponent,
  TransactionsComponent,
} from './component';

import {
  LoginPageComponent,
  DashboardComponent,
  ProfileComponent,
  ZoomComponent
} from './page';

@NgModule({
  declarations: [
    AppComponent,
    PageContentComponent,
    GuestLayoutComponent,
    GuestFooterComponent,
    AuthorizedLayoutComponent,
    AuthorizedAsideComponent,
    AuthorizedFooterComponent,
    AuthorizedNavbarComponent,
    LoginPageComponent,
    DashboardComponent,
    ProfileComponent,
    TradingAccountSettingComponent,
    TradingAccountInfoComponent,
    ZoomComponent,
    TransactionsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      maxOpened: 5,
      iconClasses: {
        error: 'text-danger',
        info: 'toast-success',
        success: 'toast-success',
        warning: 'text-danger',
      },
      toastClass: 'toast fade p-2 bg-white show',
      titleClass: 'toast-header border-0',
      messageClass: 'toast-body'
    }),
    NgxSpinnerModule,
    MatIconModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

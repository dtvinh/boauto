import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageContentComponent } from './layout/page-content/page-content.component';
import { GuestLayoutComponent } from './layout/guest/guest-layout/guest-layout.component';
import { GuestFooterComponent } from './layout/guest/guest-footer/guest-footer.component';
import { AuthorizedLayoutComponent } from './layout/authorized/authorized-layout/authorized-layout.component';
import { AuthorizedAsideComponent } from './layout/authorized/authorized-aside/authorized-aside.component';
import { AuthorizedFooterComponent } from './layout/authorized/authorized-footer/authorized-footer.component';
import { AuthorizedNavbarComponent } from './layout/authorized/authorized-navbar/authorized-navbar.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ProfileComponent } from './page/profile/profile.component';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

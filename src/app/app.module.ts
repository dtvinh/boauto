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
import { AppFooterComponent } from './shared/app-footer/app-footer.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopMenuComponent } from './shared/top-menu/top-menu.component';
import { LeftMenuComponent } from './shared/left-menu/left-menu.component';
import { DashboardFooterComponent } from './shared/dashboard-footer/dashboard-footer.component';
import { AccountSettingComponent } from './components/account-setting/account-setting.component';

@NgModule({
  declarations: [
    AppComponent,
    AppFooterComponent,
    LoginComponent,
    DashboardComponent,
    TopMenuComponent,
    LeftMenuComponent,
    DashboardFooterComponent,
    AccountSettingComponent,
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

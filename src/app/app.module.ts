import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppFooterComponent } from './shared/app-footer/app-footer.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopMenuComponent } from './shared/top-menu/top-menu.component';
import { LeftMenuComponent } from './shared/left-menu/left-menu.component';
import { DashboardFooterComponent } from './shared/dashboard-footer/dashboard-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AppFooterComponent,
    LoginComponent,
    DashboardComponent,
    TopMenuComponent,
    LeftMenuComponent,
    DashboardFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

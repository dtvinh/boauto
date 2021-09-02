import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuestLayoutComponent } from './layout/guest/guest-layout/guest-layout.component';
import { LoginPageComponent } from './page/login-page/login-page.component';

import { AuthorizedLayoutComponent } from './layout/authorized/authorized-layout/authorized-layout.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ProfileComponent } from './page/profile/profile.component';
import { ZoomComponent } from './page/zoom/zoom.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    component: GuestLayoutComponent,
    children: [{ path: 'login', component: LoginPageComponent }],
  },
  {
    path: '',
    component: AuthorizedLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'zoom', component: ZoomComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

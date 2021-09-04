import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuestLayoutComponent } from './layout/guest';
import { AuthorizedLayoutComponent } from './layout/authorized';

import {
  DashboardComponent,
  ProfileComponent,
  ZoomComponent,
  LoginPageComponent
} from './page';

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

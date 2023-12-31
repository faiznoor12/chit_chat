import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { ProfileComponent } from './components/profile/profile.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent, ...canActivate(redirectToHome) },
  { path: 'home', component: HomeComponent, ...canActivate(redirectToLogin) },
  { path: 'login', component: LoginComponent, ...canActivate(redirectToHome) },
  { path: 'profile', component: ProfileComponent, ...canActivate(redirectToLogin) },
  {
    path: 'sign-up',
    component: SignUpComponent,
    ...canActivate(redirectToHome),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

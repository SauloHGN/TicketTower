import { Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { LoginComponent } from './components/pages/login/login.component';

export const routes: Routes = [
  { path: '', title: 'Ticket Tower', component: LandingComponent },
  { path: 'home', title: 'Página Inicial', component: HomeComponent },
  { path: 'login', title: 'Entrar', component: LoginComponent },
];

import { Routes, provideRouter } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect root to Home
  { path: 'seller', component: SellerAuthComponent },
  { path: 'seller-home', component: SellerHomeComponent, canActivate: [authGuard] },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '**', component: HomeComponent },
];

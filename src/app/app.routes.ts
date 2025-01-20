import { Routes, provideRouter } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect root to Home
    { path: 'seller', component: SellerAuthComponent },
    {path:'home',component:HomeComponent}
    {path:'**',component:HomeComponent}
  ];
  


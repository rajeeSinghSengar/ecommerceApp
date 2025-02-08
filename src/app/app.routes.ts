import { Routes, provideRouter } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect root to Home
  { path: 'seller', component: SellerAuthComponent },
  { path: 'seller-home', component: SellerHomeComponent, canActivate: [authGuard] },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'seller-addproduct',
    component: AddProductComponent,
    canActivate: [authGuard]
  },
  {
    path: 'seller-viewproduct',
    component: ViewProductComponent,
    canActivate: [authGuard]
  },
  {
    path: 'search-product/:query',
    component: SearchComponent,
  },
  {
    path: 'seller-updateproduct/:id', //The :id segment indicates a route parameter.
    // This parameter allows the URL to include a dynamic value. 
    component: UpdateProductComponent,
    canActivate: [authGuard]
  },
  { path: '**', component: HomeComponent },
];

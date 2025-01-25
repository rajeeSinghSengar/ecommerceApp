import { CanActivateFn } from '@angular/router';
import { SellerService } from './services/seller.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  /**
   *
   */
  if(localStorage.getItem('seller')){
    return true;
  }
  const authService = inject(SellerService)
  return authService.isSellerLoggedIn 


};


import { Injectable } from '@angular/core';
import { Product } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
   
  addtoLocalCart(data : Product){
    
    let cartData = [];
    const existingCart = localStorage.getItem('localCart')!;

    console.log(localStorage.getItem('localCart'))
    if(!localStorage.getItem('localCart')){
      localStorage.setItem('localCart',JSON.stringify(data))
    }
    else{
      cartData = JSON.parse(existingCart);
      cartData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cartData))
    }
    console.log(" add to cart ", cartData)
  }
}

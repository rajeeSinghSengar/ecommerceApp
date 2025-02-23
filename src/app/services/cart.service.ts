import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Product, url } from '../constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartData = new EventEmitter <Product[]>();
  constructor(private http : HttpClient) { }
   
  addtoLocalCart(data : Product){
    
    let cartData = [];
    const existingCart = localStorage.getItem('localCart')!;

    if(!localStorage.getItem('localCart')){
      //while putting data in local storage we can explicitly insert it in array form
      localStorage.setItem('localCart',JSON.stringify([data]))
    }
    else{
      cartData = JSON.parse(existingCart);
      cartData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cartData))
      this.cartData.emit(cartData)
    }
    console.log(" add to cart ", cartData)
  }

  addCarttoDB(Cart : Cart){
   return this.http.post(`${url}\cart`, Cart)
  }

}

import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartList : any [] =[];
  subTotal : number = 0;
  tax : number = 0;
  constructor(private cartSvc : CartService) {
    const user = localStorage.getItem('user')
    const userId = user && JSON.parse(user).id;
    this.cartSvc.getCartListByUserId(userId).subscribe((res)=>{
      this.cartList = res;
      this.cartList.forEach((cart)=>{
        let totalProductprice = cart.quantity * cart.productprice
        this.subTotal += totalProductprice
      }

      )
      this.tax = 0.01 *this.subTotal;
    })
    
  }
}

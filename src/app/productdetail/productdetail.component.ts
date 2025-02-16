import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { SellerService } from '../services/seller.service';
import { Product } from '../constant';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-productdetail',
  imports: [FormsModule,CommonModule],
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.scss'
})
export class ProductdetailComponent {
 quantity : number = 1;
 product! : Product
  constructor(private activatedRoute: ActivatedRoute, private service : SellerService, private cartSvc : CartService){

  }
  ngOnInit(){
    this.activatedRoute.paramMap
    .pipe(
      switchMap(
         (params)=>{
           const id = params.get('id')
           return id ? this.service.getProductByid(id) : []
         }
      )
    )
    .subscribe(
      {
        next : (res) =>{
          this.product = res
         }
      }
    )
 
  }
  
  buyNow()
  {

  }
  addToCart()
  {
    if(this.product)
    {
      this.product.quantity = this.quantity
      //add to cart when user is not logged in
      if(!localStorage.getItem('user')){
        this.cartSvc.addtoLocalCart(this.product)
        console.log(" product ", this.product)
      }
    }
  }
  increaseQuantity() {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }
  
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}

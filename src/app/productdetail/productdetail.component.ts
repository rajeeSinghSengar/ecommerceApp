import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { SellerService } from '../services/seller.service';
import { Product,Cart } from '../constant';
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
      // we can keep data in local storage instead of DB for user who has not logged in
      if(!localStorage.getItem('user')){
        this.cartSvc.addtoLocalCart(this.product)
      }
      else{
         let user = localStorage.getItem('user')
         let userId = user && JSON.parse(user).id
         let productId = this.product.id
         let Cart : Cart = {
          ...this.product,
          productId,
          userId      
         }
         this.cartSvc.addCarttoDB(Cart).subscribe(
          {
            next : (res) =>{
              console.log("res" , res)
            }
          }
         )
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

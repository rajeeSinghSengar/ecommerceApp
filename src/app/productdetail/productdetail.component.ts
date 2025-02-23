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
 product! : Product;
 removecart : boolean = false;
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
          let localCart = localStorage.getItem('localCart');
          if(localCart)
          {
          console.log("local cart", localCart)
          let items : Product [] = localCart && JSON.parse(localCart)
          //once we apply filter we need to store returned value in some variable to store filtered values
          items = items.filter((product) => product.id === this.product.id);
          console.log( "items ", items)
          if(items.length >0){
            this.removecart = true;
          }
          else{
            this.removecart = false;
          }
  
          } 
          let user = localStorage.getItem('user')
          let userId = user && JSON.parse(user).id
          if(userId)
          {
          this.cartSvc.getCartListByUserId(userId).subscribe((res)=>{
            if(res){
              console.log("product detail ", res)
              this.cartSvc.cartData.emit(res)
              res= res.filter((item) =>{ 
                return(item.id === this.product.id)                
              })
              if(res.length > 0)
              {
              this.removecart = true;
              }
              else{
                this.removecart = false;
              }
            }
           })

         }
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
        if(!this.removecart) 
        {      
          this.cartSvc.addtoLocalCart(this.product)
          this.removecart = true;//toggle add to cart to remove fromcart
        }
      }
      //add to cart when user is logged in
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
              this.cartSvc.getCartListByUserId(userId).subscribe((res)=>{
                console.log("cartlist res", res)
                this.removecart = true;
                this.cartSvc.cartData.emit(res)
      
               })
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
  removeCart(){
    let localCart = localStorage.getItem('localCart')
    this.removecart = false;
    if(localCart){
      let items : Product [] = localCart && JSON.parse(localCart)

      items = items.filter((product) => product.id !== this.product.id);
        if(items)
        {
          console.log("items ", items)
            localStorage.setItem('localCart',JSON.stringify(items))
            this.cartSvc.cartData.emit(items)
        }
        else{
          localStorage.removeItem('localCart')
        }
           
        
    }}
  
}

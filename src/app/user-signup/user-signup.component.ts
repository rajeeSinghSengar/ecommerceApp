import { Component } from '@angular/core';
import { Cart, loginUser, Product, User } from '../constant';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-user-signup',
  imports: [FormsModule,CommonModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss'
})
export class UserSignupComponent {
   userLogin : boolean = false;

  constructor(private usersvc : UserService, private router : Router, private cartSvc : CartService) {

    
  }
  ngOnInit(){
    this.usersvc.userSignupReload()
  }
  signup(data : User){
    console.log(" user data ", data);
    
    this.usersvc.userSignup(data).subscribe(
      {
        next: async (res) =>{
          console.warn("printing res", res)
          localStorage.setItem("user",JSON.stringify(res.body))
          await this.addLocalCarttoRemoteDB();
          let user = localStorage.getItem('user');
          let userid = user && JSON.parse(user).id
          this.cartSvc.getCartListByUserId(userid).subscribe((res)=>{
           this.cartSvc.cartData.emit(res)
          }) 
           this.router.navigate(['/'])
        }
      }
    )
  }
 async signlogin(data :loginUser){
    this.usersvc.checkUserLogin(data).subscribe(
      async (res : any) =>{
         localStorage.setItem('user', JSON.stringify(res[0]))
         await this.addLocalCarttoRemoteDB()
         let user = localStorage.getItem('user');
         let userid = user && JSON.parse(user).id
         this.cartSvc.getCartListByUserId(userid).subscribe((res)=>{
          this.cartSvc.cartData.emit(res)
         }) 
         this.router.navigate(['/'])
      }
    )
  }
  toggleSignUp(){
    this.userLogin = true;
  }
  toggleLogin(){
    this.userLogin = false;
  }
 async addLocalCarttoRemoteDB(){
     let localcart = localStorage.getItem('localCart')!
     let user = localStorage.getItem('user');
     let userid = user && JSON.parse(user).id

     if(localcart && user)
     {
        let cartData: Product[] = JSON.parse(localcart)
        let cartList:Cart ;
        for(let index = 0; index < cartData.length ; index++)
        {
            cartList =
              {
                ...cartData[index],
                userId :userid,
                productId :cartData[index].id
              }
              
             setTimeout(
              ()=>{
                this.cartSvc.addCarttoDB(cartList).subscribe(
                  {
                    next : (res) =>{
                      console.log( "printing res ", index , res)
                    }
                  }
                )
              },
              500
             )
             if(cartData.length === index + 1){
               localStorage.removeItem('localCart')
             }
          }
   }

     }
  }


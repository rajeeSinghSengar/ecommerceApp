import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { User } from '../constant';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule,CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.scss'
})
export class SellerAuthComponent{
  sellerLogin  = true;
  constructor(private sellerSvc: SellerService, private router: Router) {
    
    
  }
  ngOnInit() {
    console.log('SellerAuthComponent initialized');
    //if user is already logged in , don't show sign up page
    this.redirectSellerHome();
  }
  signup(data:User){
   this.sellerSvc.createUser(data).subscribe((result)=>{
    console.log(result);
    this.sellerSvc.isSellerLoggedIn.next(true)
    localStorage.setItem("seller",JSON.stringify(result))
    this.router.navigate(['seller-home'])
   })
  }
  redirectSellerHome(){
   
    if(localStorage.getItem('seller')){
      console.log("redirectSeller Home called ")
      this.router.navigate(['seller-home'])
    }
  }
  login(data:object){
    console.log(data)
  }
  toggleSignUp(){
    this.sellerLogin = true;
  }
  toggleLogin(){
    this.sellerLogin = false;
  }
}

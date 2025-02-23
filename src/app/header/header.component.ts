import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';import { SellerService } from '../services/seller.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
menuType : string = 'default';
sellerName : string = "";
serchResult : any;
  userName !: string;
  cartItems : number = 0;
/**
 *
 */
constructor(private route : Router, private service : SellerService, private cartSvc : CartService) {
  
}
ngOnInit(){
  console.log("insider header component")
  this.route.events.subscribe((val:any)=>{
    //check if route url has seller
    if(val.url){
      if (val.url.includes('seller'))
      {
        //u need to check if user is logged in 
        if(localStorage.getItem('seller')){
        this.menuType = 'seller';
        const seller = localStorage.getItem('seller')
        this.sellerName = seller && JSON.parse(seller)[0].name;
        }
      }
      if(localStorage.getItem('user')){
        this.menuType = 'user';
         const user = localStorage.getItem('user')
         this.userName = user && JSON.parse(user).name;
        }
      if(localStorage.getItem('localCart')){
          let localCart = localStorage.getItem('localCart')
          this.cartItems = localCart && JSON.parse(localCart).length
          console.log("localCart items ", this.cartItems)
      }
      //once this event emitter function is called, we can get the updated cartdata every time its get modifed
      //note ngOninit will be called only once . we need to subscribe once and then it keep on listening to emitted value
      //needs to be executed at least once for the header component to start listening for updates.
        this.cartEventEmitter();      
    }

    else{
      this.menuType = 'default';    
    }
  })
}

cartEventEmitter(){
     //CartData is an event emitter which gets emitted when user which is not logged in performs add to cart
     this.cartSvc.cartData.subscribe((items)=>
      {
        this.cartItems = items.length;
    }
  )
}
sellerLogOut(){
  localStorage.removeItem('seller');
  this.route.navigate(['home'])
}
userLogOut()
{
  localStorage.removeItem('user');
  //once logOut emit cartdata which has no values
  this.cartSvc.cartData.emit([])
  this.route.navigate(['/user-signup'])
}
autosuggestionSearch(event : KeyboardEvent)
{
  const input = event.target as HTMLInputElement
   console.log(input);
  
 if(input.value.length != 0)
 {
    this.service.getFilteredProducts(input.value).subscribe(
      (res)=>{
        //limit the no of auto suggested product
        if(res.length > 3){
          res.length = 3 
        }
        this.serchResult = res
      }
    )
  }
  else{
    this.serchResult = undefined
  }

}

submitSearch(searchItem : string){
 this.route.navigate([`search-product/${searchItem}`]) //remeber don't pass : in url
}
redirectToSearch(id : string)
{
  this.route.navigate([`/product-detail/${id}`]) 

}
removeAutoSearch() {
  setTimeout(() => {
    this.serchResult = undefined
  }, 200); // Small delay to allow click event
}


}

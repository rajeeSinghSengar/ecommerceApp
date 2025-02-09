import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';import { SellerService } from '../services/seller.service';

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
/**
 *
 */
constructor(private route : Router, private service : SellerService) {
  
}
ngOnInit(){
  this.route.events.subscribe((val:any)=>{
    //check if route url has seller
    if(val.url && val.url.includes('seller')){
      //u need to check if user is logged in 
      if(localStorage.getItem('seller')){
      this.menuType = 'seller';
       const seller = localStorage.getItem('seller')
       this.sellerName = seller && JSON.parse(seller)[0].name;
      }
    }
    else{
      this.menuType = 'default';
    }
  })
}
sellerLogOut(){
  console.log("seller log out ")
  localStorage.removeItem('seller');
  this.route.navigate(['home'])
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
removeAutoSearch(){
  this.serchResult = undefined
}
submitSearch(searchItem : string){
 this.route.navigate([`search-product/${searchItem}`]) //remeber don't pass : in url
}
}

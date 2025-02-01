import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
menuType : string = 'default';
sellerName : string = "";
/**
 *
 */
constructor(private route : Router) {
  
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
}

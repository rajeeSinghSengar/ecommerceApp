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
      }
    }
    else{
      this.menuType = 'default';
    }
  })
}
}

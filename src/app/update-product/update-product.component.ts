import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  imports: [FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  updateProductMessage ! : string ;
 
  //To fetch a route parameter in your Angular component, you can use the ActivatedRoute service
  constructor(private route: ActivatedRoute) {
    
  }
  ngOninit(){
    this.route.paramMap.subscribe(
      (params)=>{
         const id = params.get('id')
         
      }
    )
  }
  updateProduct(form : NgForm){
  
  }
}

import { Component, Inject, Injectable } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../constant';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  addProductMsg :string| undefined ;
  constructor(private sellerSvc : SellerService){}

  
  addProduct(form : NgForm){
    this.sellerSvc.addProduct(form.value).subscribe((result: any)=>{

      if(result){
        console.log(result)
        this.addProductMsg = `Product added Successfully`
        setTimeout(()=>
        { 
          this.addProductMsg ='';
          form.reset() //reset  form
        },3000) //remove successsful msg after 3sec
      }
    })
  }
}

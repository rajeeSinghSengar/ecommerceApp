import { Component } from '@angular/core';
import { Product } from '../constant';
import { SellerService } from '../services/seller.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-product',
  imports: [CommonModule],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent {

  productList : Product[] | undefined;
  deleteProductMsg: string =''
  constructor(private sellerSvc : SellerService) {
    
  }
  ngOnInit(){
    this.viewProducts();
  }
   viewProducts(){
    this.sellerSvc.viewProduct().subscribe(
      (result)=>{
        this.productList = result
      }
    )
   }
   deleteProduct(id:string){
    this.sellerSvc.deleteProduct(id).subscribe((res)=>{
      this.deleteProductMsg = `Product Deleted`
      this.viewProducts()
    })
   }
}

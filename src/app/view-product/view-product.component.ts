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
}

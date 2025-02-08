import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { Product } from '../constant';

@Component({
  selector: 'app-update-product',
  imports: [FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  updateProductMessage ! : string ;
  product = {
    productname: '',
    productprice: 0,
    description: '',
    category: '',
    imgUrl: '',
    id :''
  };
  errProductMessage: string ='';

 
  //To fetch a route parameter in your Angular component, you can use the ActivatedRoute service
  constructor(private route: ActivatedRoute, private service : SellerService, private router : Router) {
    
  }
  ngOnInit(){
    console.log(" ngOninit")
    this.route.paramMap.subscribe(
      (params)=>{
         const id = params.get('id')!   // added non null assertion operator as we know it will not be null
         console.log(`printing ${id}`)
         this.service.getProductByid(id).subscribe(
          (res)=>{
           
              this.product.productname = res.productname;
              this.product.productprice = res.productprice;
              this.product.description = res.description;
              this.product.category = res.category;
              this.product.imgUrl= res.imgUrl;
              this.product.id = res.id;
              console.log("get product", this.product)
          },
          (err)=>{
            console.log("error Msg: ",err.error)
          }
         )
      }
    )
  }
  updateProduct(form : NgForm){
    this.service.updateProduct(form.value, this.product.id).subscribe(
      (res)=>{
        this.updateProductMessage = "Product updated successfully"
        //redirect to view Product page once the product is updated
        setTimeout(
          ()=>{
            this.router.navigate(['/seller-viewproduct'])
          }, 3000
        )
      },
      (err)=>{
        this.errProductMessage = "Error ocuured in updating"
      }
    )
  }
}

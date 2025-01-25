import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { User } from '../constant';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.scss'
})
export class SellerAuthComponent {

  constructor(private sellerSvc: SellerService) {
    
    
  }
  signup(data:User){
   this.sellerSvc.createUser(data).subscribe((result)=>{
    console.log(result)
   })
  }
}

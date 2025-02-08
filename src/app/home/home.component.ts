import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../services/seller.service';
import { Product } from '../constant';


@Component({
  selector: 'app-home',
  imports: [NgbModule,CommonModule,NgbCarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  trendy_productList : Product[] | undefined
  constructor(private service : SellerService){

  }

  ngOnInit(){
     this.service.trendyProduct().subscribe(
      {
        next : (res)=>{
          this.trendy_productList = res;
        },
        error :()=>{}
      }
     )
  }
}

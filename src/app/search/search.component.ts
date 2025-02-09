import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../constant';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [CommonModule,RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchProductList: Product[] | undefined;
  searchQuery: string ='';
  constructor(private service : SellerService,private route: ActivatedRoute){

  }

  ngOnInit(){
    
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.searchQuery = params.get('query') || '';
          console.log('Search Query:', this.searchQuery);
          
          // Only make API call if query is not empty
          return this.searchQuery ? this.service.getFilteredProducts(this.searchQuery) : [];
        })
      )
      .subscribe(res => {
        this.searchProductList = res || [];
      });
  }
  }

  //change detection , 
  //if there is dynamic change in this.searchQuery this life cycle hook detects and code written
  //in it will execute 

  //ngDoCheck() is inefficent as it makes multiple api calls
  // ngDoCheck(){
      
  //   this.searchQuery && this.service.getFilteredProducts(this.searchQuery).subscribe(
  //     (res) =>{
  //      this.searchProductList = res
  //     }
  //    )
  // }


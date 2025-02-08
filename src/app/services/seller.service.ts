import { Injectable } from '@angular/core';
import { Product, User, loginUser, url } from '../constant';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http : HttpClient) { }

   isSellerLoggedIn = new BehaviorSubject<boolean>(false);
   createUser(obj: User):Observable<any>{
      return this.http.post(url+'seller/' , obj)
   }
   checkUserLogin(data:loginUser){
    return this.http.get(`${url}seller?password=${data.password}&email=${data.email}`)
   }
   addProduct(productData:Product){
    console.log("add Product", productData)
    return this.http.post(`${url}product/`,productData)
   }
   viewProduct(){
    return this.http.get<Product[]>(`${url}product/`)

   }
   deleteProduct(id:string){
    return this.http.delete(`${url}product/${id}`)
   }
   getProductByid(id: string){
          return this.http.get<Product>(`${url}product/${id}`)
   }
   updateProduct(data : Product, id: string){
        return this.http.put<Product>(`${url}product/${id}`, data)
   }
   trendyProduct(){
    return this.http.get<Product[]>(`${url}product?_limit=4`)
   }
}

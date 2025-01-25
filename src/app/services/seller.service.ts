import { Injectable } from '@angular/core';
import { User, loginUser, url } from '../constant';
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
}

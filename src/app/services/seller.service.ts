import { Injectable } from '@angular/core';
import { User, url } from '../constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http : HttpClient) { }

   createUser(obj: User):Observable<any>{
      return this.http.post(url+'seller/' , obj)
   }
}

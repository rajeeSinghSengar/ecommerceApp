import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url, User } from './constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

   userSignup(data :User){
    console.log(" user service ")
    return this.http.post<User>(`${url}user`, data,{observe : 'response'})
   }
}

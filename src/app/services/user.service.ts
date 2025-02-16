import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginUser, url, User } from '../constant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient, private router : Router) { }

   userSignup(data :User){
    console.log(" user service ")
    return this.http.post<User>(`${url}user`, data,{observe : 'response'})
   }
   userSignupReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
   }
   checkUserLogin(data:loginUser){
       return this.http.get(`${url}user?password=${data.password}&email=${data.email}`)
      }

}

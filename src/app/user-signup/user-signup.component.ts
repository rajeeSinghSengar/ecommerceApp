import { Component } from '@angular/core';
import { loginUser, User } from '../constant';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-signup',
  imports: [FormsModule,CommonModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss'
})
export class UserSignupComponent {
   userLogin : boolean = false;

  constructor(private usersvc : UserService, private router : Router) {

    
  }
  ngOnInit(){
    this.usersvc.userSignupReload()
  }
  signup(data : User){
    console.log(" user data ", data);
    
    this.usersvc.userSignup(data).subscribe(
      {
        next: (res) =>{
          console.warn("printing res", res)
          localStorage.setItem("user",JSON.stringify(res.body))
           this.router.navigate(['/'])
        }
      }
    )
  }
  signlogin(data :loginUser){
    this.usersvc.checkUserLogin(data).subscribe(
      (res : any) =>{
         localStorage.setItem('user', JSON.stringify(res[0]))
         this.router.navigate(['/'])
      }
    )
  }
  toggleSignUp(){
    this.userLogin = true;
  }
  toggleLogin(){
    this.userLogin = false;
  }
}

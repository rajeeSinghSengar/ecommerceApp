import { Component } from '@angular/core';
import { User } from '../constant';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  imports: [FormsModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss'
})
export class UserSignupComponent {


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
}

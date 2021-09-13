import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userItem = new UserModel("");

  constructor(private authService: AuthService, private _router: Router) { }

  confpaswd="";
  samepaswd: Boolean = false;
  paswdval:String="";

  ngOnInit(): void {
  }

  AddUser(){
    this.authService.addUser(this.userItem);
    console.log("added");
    alert("Registered successfully");
    this._router.navigate(['/login']);
  }
  // check(){
  //   if(this.confpaswd == this.userItem.paswd){
  //     this.samepaswd = true;
  //     this.paswdval = "";
  //   }
  //   else{
  //     this.samepaswd = false;
  //     this.paswdval = "Passwords must be same";
  //   }
  // }
}

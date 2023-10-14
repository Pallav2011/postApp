import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userDetails = {
    userId:'',
    password:''
  } 
  constructor() { }

  ngOnInit() {
  }

  login(form : NgForm) {
    this.userDetails.userId = form.value.email;
    this.userDetails.password = form.value.password;
    console.log(this.userDetails.userId);
    console.log(this.userDetails.password);   
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseDatabaseService } from '../services/firebase-database.service';

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
  constructor(private firebaseservice : FirebaseDatabaseService) { }

  ngOnInit() {
  }

  getData = [];

  login(form : NgForm) {
    this.userDetails.userId = form.value.email;
    this.userDetails.password = form.value.password;
    console.log(this.userDetails);
    
    this.firebaseservice.getDetails().subscribe((res)=>{
      this.getData.push(res);
      console.log(this.getData);
      
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseDatabaseService } from '../services/firebase-database.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userDetails ={
    email : '',
    userName : '',
    password : ''
  }
  constructor(private firebaseService : FirebaseDatabaseService) { }

  ngOnInit() {
  }

  saveData(form : NgForm){
    this.userDetails.email = form.value.email;
    this.userDetails.userName = form.value.userName;
    this.userDetails.password = form.value.password;
    console.log(this.userDetails);    
    this.firebaseService.postUserDetails(this.userDetails).subscribe((res)=>{
      console.log(res);  
    })
  }

}

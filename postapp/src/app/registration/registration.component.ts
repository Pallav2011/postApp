import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseDatabaseService } from '../services/firebase-database.service';
import { JsonserverService } from '../services/jsonserver.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // arrayOfUsers = [];
 
  constructor(private firebaseService : FirebaseDatabaseService, private jsonserver:JsonserverService) { }

  ngOnInit() {
  }

  saveData(form : NgForm){
    let userDetails ={
      email : form.value.email,
      userName : form.value.userName,
      password : form.value.password
    }
   
    this.jsonserver.sendUser(userDetails).subscribe((res)=>{
      console.log('json server responce',res);    
      alert('Account Created Successfully !!!');
      form.resetForm();
    })

    // following code is working for firebase database 

    // this.arrayOfUsers.push(userDetails);
    // this.firebaseService.postUserDetails(this.arrayOfUsers).subscribe((res)=>{
    //   console.log(res);
      // alert('Account Created Successfully !!!');
      // form.resetForm();
    // })
    
  }

}

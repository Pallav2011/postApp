import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FirebaseDatabaseService } from "../services/firebase-database.service";
import { Router } from "@angular/router";
import { SubjectService } from "../services/subject.service";
import { AuthService } from "../services/auth.service";
import { JsonserverService } from "../services/jsonserver.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  errorMessage: boolean = false;
  constructor(
    private firebaseservice: FirebaseDatabaseService,
    private route: Router,
    private subjectServ: SubjectService,
    private authservice : AuthService,
    private jsonservice : JsonserverService
  ) {}

  ngOnInit() {}

  getData; 
  jsonUserData;

  login(form: NgForm) {

    let email = form.value.email;
    let pass = form.value.password;
    this.jsonservice.getUser().subscribe((res)=>{
      console.log('get json user data',res);
      this.jsonUserData = res;
      this.jsonUserData.forEach(currentVal => {
        if (currentVal.email == email && currentVal.password == pass) {
          this.errorMessage = false;
          this.subjectServ.userName.next(currentVal.userName);
          this.route.navigate(["posts"]);
        }else {
          this.errorMessage = true;
          form.resetForm();
        }
      });
    })

   

    // following code is working for firebase database

    //   this.firebaseservice.getDetails().subscribe((res) => {
    //   this.getData = res;  // here we get array of users from firebase
    //     let email = form.value.email;
    //     let pass = form.value.password;
    //   this.getData.forEach((currentVal) => {
    //     if (currentVal.email == email && currentVal.password == pass) {
    //       this.authservice.validateValue.next(true);
    //       this.errorMessage = false;
    //       this.subjectServ.userName.next(currentVal.userName);
    //       this.route.navigate(["posts"]);
    //     } else {
    //       this.authservice.validateValue.next(false);
    //       this.errorMessage = true;
    //       form.resetForm();
    //     }
    //   });
    // });
  }
}

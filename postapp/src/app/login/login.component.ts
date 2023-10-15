import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FirebaseDatabaseService } from "../services/firebase-database.service";
import { Router } from "@angular/router";
import { SubjectService } from "../services/subject.service";
import { AuthService } from "../services/auth.service";

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
    private authservice : AuthService

  ) {}

  ngOnInit() {}

  getData = [];

  login(form: NgForm) {
    console.log(form);

    this.firebaseservice.getDetails().subscribe((res) => {
      this.getData.push(res);
      console.log(this.getData);

      this.getData.forEach((currentVal) => {
        console.log(currentVal);

        if (
          currentVal.email == form.value.email &&
          currentVal.password == form.value.password
        ) {
          this.authservice.validateValue.next(true);
          this.errorMessage = false;
          console.log("you are eligible to go posts");
          this.subjectServ.userName.next(currentVal.userName);
          this.route.navigate(["posts"]);
        } else {
          this.authservice.validateValue.next(false);
          console.log("not eligible");
          this.errorMessage = true;
          form.resetForm();
        }
      });
    });
  }
}

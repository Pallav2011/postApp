import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  userName = '';
  url = '';
  file:any;
  showPost:boolean = false;
  captionData = '';
  constructor(private subjectServ : SubjectService) { }

  ngOnInit() {
    this.subjectServ.userName.subscribe(res=>{
      this.userName = res;
    })
  }

  getFile(event:any){
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event :any)=>{
      this.file = event.target.result;
      }
    }
  }

  uploadFile(cap){
    console.log(cap.value);
    
    this.url = this.file;
    this.captionData = cap.value;
    this.showPost = true;
  }

}

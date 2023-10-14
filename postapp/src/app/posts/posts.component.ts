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
  likeUrl = './assets/not_like.png';
  countLikes:number = 0;
  uploadButton:boolean = true;
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
    this.uploadButton = false;
  }

  uploadFile(cap){
    console.log(cap.value);
    
    this.url = this.file;
    this.captionData = cap.value;
    this.showPost = true;
  }

  buttonClicked(){
    if (this.likeUrl == './assets/not_like.png') {
      this.likeUrl = './assets/like_red.png';
      this.countLikes++;
    }
    else{
      this.likeUrl = './assets/not_like.png';
      this.countLikes--;
    }
  }

}

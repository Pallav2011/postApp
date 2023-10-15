import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { PostserviceService } from '../services/postservice.service';

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
  allPosts = [];
  commentMsg = '';
  displayComment: boolean = false;
  constructor(private subjectServ : SubjectService, private postService:PostserviceService) { }

  ngOnInit() {
    this.subjectServ.userName.subscribe(res=>{
      this.userName = res;
    })
    this.getPostsData();
    
  }

  getPostsData (){
    this.postService.getUserData().subscribe((res)=>{
      console.log(res);
      this.allPosts.push(res);
      this.allPosts.reverse();
      console.log(this.allPosts); 
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

   postDetails = {
    postUser : '',
    caption : '',
    postImageUrl : ''
  }

  uploadFile(cap){
   this.postDetails.postUser = this.userName;
   this.postDetails.caption = cap.value;
   this.postDetails.postImageUrl = this.file;
    this.postService.postUserData(this.postDetails).subscribe((res)=>{
      console.log(res);     
    })
    this.getPostsData();
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

  addComment(comment:any){
    this.commentMsg = comment.value;
    this.displayComment = true;
  }

}

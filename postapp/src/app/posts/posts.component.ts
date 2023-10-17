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
  file:any;
  showPost:boolean = false;
  likeUrl = './assets/not_like.png';
  countLikes:number = 0;
  uploadButton:boolean = true;
  allPosts;
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
      console.log('get data from server: ',res);
      this.allPosts = res;
      // this.allPosts.reverse();
    })
  }

  // following function is used to get the url of selected file
  getFile(event:any){
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event :any)=>{
      this.file = event.target.result; // here we will get the final url of selected file
      }
    }
    this.uploadButton = false;
  }

  arrayOfPosts = [];
  uploadFile(cap){
   let postDetails = {
      postUser :  this.userName,
      caption : cap.value,
      postImageUrl :  this.file
    }
    this.arrayOfPosts.push(postDetails);
    this.postService.postUserData(this.arrayOfPosts).subscribe((res)=>{
      console.log('sent to server :',res);
    this.getPostsData();
    })  

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

import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { PostserviceService } from '../services/postservice.service';
import { JsonserverService } from '../services/jsonserver.service';

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
  constructor(private subjectServ : SubjectService, private postService:PostserviceService, private jsonservice:JsonserverService) { }

  ngOnInit() {
    this.getCurrentUserName();
    this.getPostsData();    
  }

  getCurrentUserName(){
    this.subjectServ.userName.subscribe(res=>{
      this.userName = res;
    })
  }

  getPostsData (){
    this.jsonservice.getPostData().subscribe((res)=>{
      console.log('get posts from json',res);
      this.allPosts = res;
      this.allPosts.reverse();
    })

    // following code is working for firebase database

    // this.postService.getUserData().subscribe((res)=>{
    //   console.log('get data from server: ',res);
    //   this.allPosts = res;
    //   this.allPosts.reverse();
    // })
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

  // arrayOfPosts = [];        this line is use when firebase server used
 
  uploadFile(caption){
   let postDetails = {
      postUser :  this.userName,
      caption : caption.value,
      postImageUrl : this.file
    }

    this.jsonservice.sendPostData(postDetails).subscribe((res)=>{
      console.log('post sent to json',res);
      this.getPostsData();
    })

    // following code is working for firebase databse

    // this.arrayOfPosts.push(postDetails);
    // this.postService.postUserData(this.arrayOfPosts).subscribe((res)=>{
    // console.log('sent to server :',res);
    // this.getPostsData();
    // })  

    this.showPost = true;
  }

  likeButtonClicked(){
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

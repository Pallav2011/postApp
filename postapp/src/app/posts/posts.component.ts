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
  isLike = './assets/like_red.png';
  isNotLike = './assets/not_like.png';
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
      postImageUrl : this.file,
      likes : {
        likeCounts : 0,
        likedUsersArray : []
      },
      comments :[]
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

  likeButtonClicked(user){
    
    let arr = user.likes.likedUsersArray;
    
    if (user.likes.likedUsersArray.includes(this.userName)) {
      let indexOfUserName = user.likes.likedUsersArray.indexOf(this.userName);
      arr.splice(indexOfUserName,1);
      
      if (user.likes.likeCounts != 0) {             
      let updatedUserLikes = {
        postUser :  user.postUser,
        caption : user.caption,
        postImageUrl : user.postImageUrl,
        likes : {
          likeCounts:user.likes.likeCounts-1,
          likedUsersArray : arr
        },
        comments : user.comments
      }
      this.jsonservice.updatePostData(user.id,updatedUserLikes).subscribe((res)=>{
        console.log('likes decreament updated'); 
        this.getPostsData();
      })
    } 
      
    } else{
      arr.push(this.userName);

      let updatedUserLikes = {
        postUser :  user.postUser,
        caption : user.caption,
        postImageUrl : user.postImageUrl,
        likes : {
          likeCounts:user.likes.likeCounts+1,
          likedUsersArray : arr
        },
        comments : user.comments
      }
      this.jsonservice.updatePostData(user.id,updatedUserLikes).subscribe((res)=>{
        console.log('likes increament updated'); 
        this.getPostsData();
      })
  }  
 }


  addComment(user,comment:any){

    let commentObject ={
      commentUser : this.userName,
      commentMessage : comment.value
    }
    let commentArray = user.comments;
    commentArray.push(commentObject)

    let updatedUserComments = {
      postUser :  user.postUser,
      caption : user.caption,
      postImageUrl : user.postImageUrl,
      likes : user.likes,
      comments : commentArray
    }
    this.jsonservice.updatePostData(user.id,updatedUserComments).subscribe((res)=>{
      console.log('comment is added'); 
      this.getPostsData();
    })
  }
}

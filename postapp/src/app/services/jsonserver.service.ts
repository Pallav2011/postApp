import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonserverService {

  usersUrl='http://localhost:3000/userDetails';
  postsUrl='http://localhost:3000/userPosts';

  constructor(private httpclient:HttpClient) { }

  sendUser(userDetails){
    return this.httpclient.post(this.usersUrl,userDetails)
  }

  getUser(){
    return this.httpclient.get(this.usersUrl)
  }

  sendPostData(postData){
    return this.httpclient.post(this.postsUrl,postData)
  }

  getPostData(){
    return this.httpclient.get(this.postsUrl)
  }
}

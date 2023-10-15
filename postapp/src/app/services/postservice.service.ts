import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostserviceService {

  url = 'https://userposts-89670-default-rtdb.firebaseio.com/';

  constructor(private httpclient : HttpClient) { }

  postUserData(data){
    return this.httpclient.put(this.url+'userPostData.json',data);
  }

  getUserData(){
    return this.httpclient.get(this.url+'userPostData.json');
  }
}

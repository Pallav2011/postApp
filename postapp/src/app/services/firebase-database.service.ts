import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {

  url = 'https://postappdatabase-default-rtdb.firebaseio.com/';
  constructor(private httpclient : HttpClient) { }

  postUserDetails(details){
    return this.httpclient.put(this.url+'userDetails.json',details);
  }

  getDetails(){
    return this.httpclient.get(this.url+'userDetails.json');
  }

}

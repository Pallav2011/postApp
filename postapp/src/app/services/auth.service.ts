import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  validateValue =new BehaviorSubject<boolean>(false);
 
  isUserLoggedIn(){
    if(this.validateValue){
      return true
    } else {
      return false
    }
    
  }


}

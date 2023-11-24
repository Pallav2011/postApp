import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdGuard implements CanActivate {
  
  constructor(private authservice : AuthService){ }
  
  canActivate(){
    let result;
    
    this.authservice.validateValue.subscribe(res=>{
      result = res;
    })
    
    if(result){
      return true
    } else {
      return false
    }
  }

}

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
    if(this.authservice.isUserLoggedIn()){
      return true
    } else {
      return false
    }
  }

}

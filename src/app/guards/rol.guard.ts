import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const username : string = route.params['username']
      const userLogged = localStorage.getItem('user');
      let res : boolean = false
      if(username == userLogged){
        res = true;
      }
      
      return localStorage.getItem('role') ==='ADMIN_ROLE' && res;
  }
  
}

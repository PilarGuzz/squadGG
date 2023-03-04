import {  Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit  {
isLoggedIn$!: Observable<boolean>;
isAdmin$!: Observable<boolean>;

username!: string | null;
//logged! : boolean;
role: string |null ='';
  constructor(private authService:  AuthService) { }
  
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isAdmin$ = this.authService.isAdmin;
    
    if (localStorage.getItem('user') != null) {
      this.username = localStorage.getItem('user');
      this.role = localStorage.getItem('role');
      this.authService.loggedIn.next(true);
      this.authService.admin.next(this.role == 'ADMIN_ROLE');
    }   

  }


  onlogOut():void {
    this.authService.logout();
  }


}

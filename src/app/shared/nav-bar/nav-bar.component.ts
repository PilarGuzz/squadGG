import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit  {

logged! : boolean;
  constructor(private authService:  AuthService) { }
  
  ngOnInit(): void {
    this.logged = this.authService.isAuthenticated();
  }


  onlogOut():void {
    this.authService.logout();
    this.logged=false;
  }



}

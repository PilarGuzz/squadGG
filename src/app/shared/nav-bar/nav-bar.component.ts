import {  Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit  {
username!: string | null;
logged! : boolean;
role: string |null ='';
  constructor(private authService:  AuthService) { }
  
  ngOnInit(): void {
    this.authService.isloggedIn.subscribe({
      next: (resp) => {
        this.logged=resp
      }
    })

    this.authService.userRole.subscribe({
      next: (resp) =>{
        this.role = resp;
      }
    })
    this.username = localStorage.getItem('user');

  }


  onlogOut():void {
    this.authService.logout();
    this.logged=false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.username = localStorage.getItem('user');
 
  }

  



}

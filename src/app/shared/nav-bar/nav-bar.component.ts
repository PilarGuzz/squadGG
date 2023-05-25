import {  Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_interfaces/user.interface';
import { CommonService } from 'src/app/_services/common.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit  {
isLoggedIn$!: Observable<boolean>;
isAdmin$!: Observable<boolean>;
username$!: Observable<string>;

user!: User
username!: string | null;
//logged! : boolean;
role: string |null ='';

messageReceived: any;
private subscriptionName: Subscription; //important to create a subscription
    
  constructor(private authService:  AuthService, private userServ: UserService, private commonService: CommonService) { 
     // subscribe to sender component messages
     this.subscriptionName= this.commonService.getUpdate().subscribe
     (message => { //message contains the data sent from service
     if(message){this.ngOnInit()}
     this.messageReceived = message;
     });
  }
  
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isAdmin$ = this.authService.isAdmin;
    this.username$ = this.authService.username;
    
    if (localStorage.getItem('user') != null) {
      this.username = localStorage.getItem('user');
      this.role = localStorage.getItem('role');
      this.authService.loggedIn.next(true);
      this.authService.admin.next(this.role == 'ADMIN_ROLE');

      this.userServ.getUser(this.username)
        .subscribe({
          next:(resp) =>{
            this.user = resp
          } ,
          error: (error) => console.log(error)
          
        })
    }   

  }


  onlogOut():void {
    this.authService.logout();
    this.ngOnInit()
  }



}

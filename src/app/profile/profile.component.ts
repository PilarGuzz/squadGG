import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../shared/interfaces/user.interface';
import { AuthService } from '../auth/auth.service';
import { DecodeToken } from '../shared/interfaces/decode-token.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username!: string | null;
  user!: User;
  token!: DecodeToken;

  constructor(private userSrv : UserService, private authServ : AuthService) {}

  ngOnInit(): void {
    this.token = this.authServ.token;
    this.username = localStorage.getItem('user');

    this.userSrv.getUser(this.username)
    .subscribe({
      next:(resp) =>{
        this.user = resp
        console.log(resp);
      } ,
      error: (error) => console.log(error)
      
    })
    

    
  }

}

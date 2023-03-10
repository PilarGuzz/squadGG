import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

const swalert = require('sweetalert2')


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('myForm') myForm!: NgForm;
  
    username!: string;
    password!: string;
    isLoggedIn: boolean = false;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {


  }
  notValidUsername(): boolean{
    return this.myForm?.controls['username']?.invalid && 
        this.myForm?.controls['username']?.touched
  }
  notValidPassword(): boolean{
    return this.myForm?.controls['password']?.invalid && 
        this.myForm?.controls['password']?.touched
  }


  onlogin():void {
    this.authService.login(this.myForm.value.username, this.myForm.value.password)
    .subscribe({
      next: (resp) =>{
        this.isLoggedIn= true;
        if (resp) this.router.navigate(['/game']);
          else {
            this.username="";
            this.password="";
            swalert.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuario or Contraseña erróneo!',
            })
            this.router.navigate(['/auth/login']);
          }
      }
    })
  }




}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';

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

    auth2: any;
    @ViewChild('loginRef', {static: true }) loginElement!: ElementRef;

  constructor(private authService: AuthService,
              private router: Router,
              private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.googleAuthSDK();

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

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['/']));
  }

  callLoginButton() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser:any) => {

        let profile = googleAuthUser.getBasicProfile();
        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

       /* Write Your Code Here */

      }, (error:any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
 
  }

  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '807418543433-0hjiibg74ddg11liscb6tlnu774g41v7.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLoginButton();
      });
    }

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement('script'); 
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));

  }




}

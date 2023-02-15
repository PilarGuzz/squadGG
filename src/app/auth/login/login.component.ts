import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('myForm') myForm!: NgForm;
  
    username!: string;
    password!: string;
  
  

  constructor() { }

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
  onSubmit(){

    console.log(`Username: ${this.password} Password: ${this.password}`)
      this.myForm.resetForm();

  }

}

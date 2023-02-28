import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UserService } from '../user.service';
const swalert = require('sweetalert2')


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user!: User;

  myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(3)]],
    birth: ['', [Validators.required, this.ageValidator(16) ]],
    password: ['', [Validators.required, Validators.minLength(6), this.validatePassword]],
    repeatpassword: ['', [Validators.required, this.matchPassword]]
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const username = localStorage.getItem('user');

    this.userService.getUser(username)
    .subscribe({
      next:(resp) =>{
        this.user = resp

        //const birth = `${this.user.birth.getFullYear()}-${this.user.birth.getMonth() + 1}-${this.user.birth.getDate()}`;
        this.myForm = this.fb.group({
          username: [this.user.username, [Validators.required, Validators.minLength(3)]],
          email: [this.user.email, [Validators.required, Validators.minLength(3)]],
          birth: [formatDate(this.user.birth, 'yyyy-MM-dd', 'en'), [Validators.required, this.ageValidator(16) ]],
          password: ['', [Validators.required, Validators.minLength(6), this.validatePassword]],
          repeatpassword: ['', [Validators.required, this.matchPassword]]
        })
      } ,
      error: (error) => console.log(error)
      
    })
  }
  ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const birthday = new Date(control.value);
      const ageDiffMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      return age >= minAge ? null : { 'minAge': {value: age} };
    };
  }

    validatePassword(control: FormControl) {
      const password = control.value;
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const valid = hasUppercase && hasLowercase && hasNumber;
      return valid ? null : { invalidPassword: true };
    }


    matchPassword(control: FormControl) {
      const passwordControl = control.root.get('password');
      if (!passwordControl) {
        return null;
      }
      const password = passwordControl.value;
      const confirmPassword = control.value;
      return password === confirmPassword ? null : { mismatch: true };
    }

    isValidField(field:string){
      return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
    }

    send() {
      this.user.username = this.myForm.value.username
      this.user.email = this.myForm.value.email;
      this.user.birth = this.myForm.value.birth;
      this.user.password = this.myForm.value.password;
   
      
    }

    save(){
      if(this.myForm.invalid){
        this.myForm.markAllAsTouched();
        return 
      }
   }
  
    onSubmit(){
      this.send();
      this.save();
      
    }
}

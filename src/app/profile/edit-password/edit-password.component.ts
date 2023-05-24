import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_interfaces/user.interface';
import { UserService } from 'src/app/_services/user.service';

const swalert = require('sweetalert2')


@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  user!: User;

  myForm: FormGroup = this.fb.group({
    currentpassword: ['', [ this.isCurrentPass]],
    password: ['', [ Validators.minLength(6), this.validatePassword]],
    repeatpassword: ['', [ this.matchPassword]],
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  //TO DO
  private isCurrentPass(control: FormControl) {
    const passwordControl = control.root.get('password');
    if (!passwordControl) {
      return null;
    }
    const password = passwordControl.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  private validatePassword(control: FormControl) {
    if(control.value.length===0) return null;
    const password = control.value;
    const minLength = password.length >= 6;   
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const valid = hasUppercase && hasLowercase && hasNumber && minLength;
    return valid ? null : { invalidPassword: true };
  }

  private matchPassword(control: FormControl) {
    const passwordControl = control.root.get('password');
    if (!passwordControl) {
      return null;
    }
    const password = passwordControl.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  isValidField(field:string){
    return this.myForm.controls[field]?.errors
    && this.myForm.controls[field].touched
  }

  private save(): Boolean{
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return false;
    }
    return true;
  }

  private send() {
    this.userService.updateUser(this.user.username, this.myForm)
      .subscribe({
        next: (resp) => {
          swalert.fire('Usuario actualizado', 'Se ha actualizado el usuario correctamente', 'success')
          this.router.navigateByUrl('/profile/this.user.username')
        },
        error: (error) => {
          swalert.fire('Error', error.error.msg, 'error')
        }
      });
  }
  
  onSubmit(){
    if (this.save()) {
      this.send();
    }
  }
  

}

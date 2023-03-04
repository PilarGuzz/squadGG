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
  // img?: File;

  myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(3)]],
    birth: ['', [Validators.required, this.ageValidator(16) ]],
    password: ['', [Validators.required, Validators.minLength(6), this.validatePassword]],
    repeatpassword: ['', [Validators.required, this.matchPassword]],
    img: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const username = localStorage.getItem('user');

    this.userService.getUser(username)
      .subscribe({
        next:(resp) =>{
          this.user = resp
          this.myForm = this.fb.group({
            username: [this.user.username, [Validators.required, Validators.minLength(3)]],
            email: [this.user.email, [Validators.required, Validators.minLength(3)]],
            birth: [formatDate(this.user.birth, 'yyyy-MM-dd', 'en'), [Validators.required, this.ageValidator(16) ]],
            password: ['', [Validators.required, Validators.minLength(6), this.validatePassword]],
            repeatpassword: ['', [Validators.required, this.matchPassword]]
          })
        } ,
        error: (error) => console.log(error)
        
      });
  }
  
  private ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const birthday = new Date(control.value);
      const ageDiffMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      return age >= minAge ? null : { 'minAge': {value: age} };
    };
  }

  private validatePassword(control: FormControl) {
    const password = control.value;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const valid = hasUppercase && hasLowercase && hasNumber;
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
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched
  }

  onFileSelected(event: any) {
    this.myForm.value.img = event.target.files[0];
  }

  private send() {

    // Carlos Implementa aqui el servicio para actualizar el usuario
    // this.userService.updateUser(this.user.username, this.myForm)
    //   .subscribe({
    //     next: (resp) => {
    //       swalert.fire('Usuario actualizado', 'Se ha actualizado el usuario correctamente', 'success')
    //       this.router.navigateByUrl('/profile')
    //     },
    //     error: (error) => {
    //       swalert.fire('Error', error.error.msg, 'error')
    //     }
    //   });


    this.userService.updateUser({
      username: this.myForm.value.username,
      email: this.myForm.value.email,
      birth: this.myForm.value.birth,
      password: this.myForm.value.password
    }, this.myForm.value.img, this.user.username)
      .subscribe({
        next: (resp) => {
          swalert.fire('Usuario actualizado', 'Se ha actualizado el usuario correctamente', 'success')
          this.router.navigateByUrl('/profile')
          },
          error: (error) => {
            swalert.fire('Error', error.error.msg, 'error')
        }
      });

  }

  private save(): Boolean{
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return false;
    }
    return true;
  }
  
  onSubmit(){
    if (this.save()) {
      this.send();
    }
  }
}

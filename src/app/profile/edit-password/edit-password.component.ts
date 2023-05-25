import { HttpResponse } from '@angular/common/http';
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
  resultMessage!: string;

  username: string | null = localStorage.getItem('user');

  myForm: FormGroup = this.fb.group({
    currentpassword: ['', []],
    password: ['', [ Validators.minLength(6), this.validatePassword]],
    repeatpassword: ['', [ this.matchPassword]],
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.isCurrentPass = this.isCurrentPass.bind(this);
   }

  ngOnInit(): void {
  }

  //TO DO
  private isCurrentPass(control: FormControl) {
    const passwordControl = control.root.get('currentpassword');
   // this.username = localStorage.getItem('user');
    //console.log(this.username+ "2");

    if (!passwordControl ||this.username == null ) {
      return null;
    }
    this.userService.checkPass(this.username, control.value)
    .subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.resultMessage = response.body;
          return true;
        } else if (response.status === 401) {
          this.resultMessage = response.body;
          return false;
        } else {
          this.resultMessage = 'Error al verificar la contraseña';
          return false;
        }
      },
      (error: any) => {
        console.error(error);
        this.resultMessage = 'Error al verificar la contraseña';
        return false;
      }
    );
    return false;

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
    if(this.username != null){
      this.userService.updatePass(this.username, this.myForm.value.currentpassword, this.myForm.value.password)
        .subscribe({
          next: (resp) => {
            swalert.fire('Contraseña actualizado', 'Se ha actualizado la contraseña correctamente', 'success')
            const url = '/profile/' + this.username; // Construye la URL completa
            this.router.navigateByUrl(url); // Redirecciona a la URL construida
           // this.router.navigateByUrl('/profile/this.user.username')
          },
          error: (error) => {
            swalert.fire('Error', this.resultMessage, 'error')
          }
        });

    }
  }
  
  onSubmit(){
    if (this.save()) {
      this.send();
    }
  }
  

}

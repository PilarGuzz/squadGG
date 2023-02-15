import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup,  ValidatorFn,  Validators } from '@angular/forms';


@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(3)]],
    birth: ['', [Validators.required, this.ageValidator(16) ]],
    password: ['', [Validators.required, Validators.minLength(6), this.validatePassword]],
    repeatpassword: ['', [Validators.required, this.matchPassword]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
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


   ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const birthday = new Date(control.value);
      const ageDiffMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      return age >= minAge ? null : { 'minAge': {value: age} };
    };
  }


  isValidField(field:string){
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched
  }
  save(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return 
    }
    this.myForm.reset()
    
    console.log(this.myForm.value)
  }
}

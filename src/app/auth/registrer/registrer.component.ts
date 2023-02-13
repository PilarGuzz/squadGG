import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(3)]],
    birth: ['', [Validators.required ]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatpassword: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
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

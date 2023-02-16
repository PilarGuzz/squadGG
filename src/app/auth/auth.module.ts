import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrerComponent } from './registrer/registrer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RegistrerComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    RouterModule

  ],
  exports:[
    RegistrerComponent,
    LoginComponent
  ]
})
export class AuthModule { }

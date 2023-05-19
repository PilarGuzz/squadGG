import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component';



@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class ContactModule { }

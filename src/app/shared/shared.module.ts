import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavBarComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }

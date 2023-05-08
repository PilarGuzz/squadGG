import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    NavBarComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    NavBarComponent,
    NotFoundComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }

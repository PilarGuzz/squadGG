import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path:'',
    children: [
      { 
        path: ':username',
        component: ProfileComponent
      },
      {
        path: ':username/edit', 
        component: EditProfileComponent
      }
  ]
  }
] 


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ProfileRoutingModule { }

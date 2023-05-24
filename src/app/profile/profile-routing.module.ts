import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RolGuard } from '../_guards/rol.guard';
import { EditPasswordComponent } from './edit-password/edit-password.component';

const routes: Routes = [
  {
    path:'',
    children: [
      { 
        path: ':username', canActivate: [RolGuard],
        component: ProfileComponent
      },
      {
        path: ':username/edit', canActivate: [RolGuard],
        component: EditProfileComponent
      },
      {
        path: ':username/editPass', canActivate: [RolGuard],
        component: EditPasswordComponent
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { PrincipalprofileComponent } from './principalprofile/principalprofile.component';
import { DataProfileComponent } from './data-profile/data-profile.component';
import { GameProfileComponent } from './game-profile/game-profile.component';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PrincipalprofileComponent,
    DataProfileComponent,
    GameProfileComponent,
    ProfileComponent,
    EditProfileComponent
    ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }

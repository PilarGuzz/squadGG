import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { PrincipalprofileComponent } from './principalprofile/principalprofile.component';
import { DataProfileComponent } from './data-profile/data-profile.component';
import { GameProfileComponent } from './game-profile/game-profile.component';
import { ProfileComponent } from './profile.component';



@NgModule({
  declarations: [
    PrincipalprofileComponent,
    DataProfileComponent,
    GameProfileComponent,
    ProfileComponent
    ],
  imports: [
    CommonModule,
    ProfileRoutingModule    
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainComponent } from './main.component';
import { ContentComponent } from './content/content.component';
import { CommentsComponent } from './content/comments/comments.component';
import { ProfileComponent } from './profile/profile.component';
import { GamesComponent } from './games/games.component';



@NgModule({
  declarations: [
    SideBarComponent,
    MainComponent,
    ContentComponent,
    CommentsComponent,
    ProfileComponent,
    GamesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comments/comment/comment.component';
import { SideBarComponent } from './side-bar/side-bar.component';



@NgModule({
  declarations: [
    GamesComponent,
    CommentsComponent,
    CommentComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GamesModule { }

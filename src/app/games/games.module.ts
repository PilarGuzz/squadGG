import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comments/comment/comment.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { GamesRoutingModule } from './games-routing.module';



@NgModule({
  declarations: [
    GamesComponent,
    CommentsComponent,
    CommentComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comments/comment/comment.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { GamesRoutingModule } from './games-routing.module';
import { RouterModule } from '@angular/router';
import { AddGameComponent } from './add-game/add-game.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GamesComponent,
    CommentsComponent,
    CommentComponent,
    SideBarComponent,
    AddGameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GamesRoutingModule,
    RouterModule
  ]
})
export class GamesModule { }

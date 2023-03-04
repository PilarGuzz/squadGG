import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comments/comment/comment.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { GamesRoutingModule } from './games-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';







@NgModule({
  declarations: [
    GamesComponent,
    CommentsComponent,
    CommentComponent,
    SideBarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    GamesRoutingModule,
    RouterModule,    
    MatTableModule,
    MatSortModule
  ],
  providers: [MatTableDataSource],
})
export class GamesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comments/comment/comment.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { GamesRoutingModule } from './games-routing.module';
import { RouterModule } from '@angular/router';
import { AddGameComponent } from './admin/add-game/add-game.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DatatableComponent } from './admin/datatable/datatable.component';







@NgModule({
  declarations: [
    GamesComponent,
    CommentsComponent,
    CommentComponent,
    SideBarComponent,
    AddGameComponent,
    DatatableComponent
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

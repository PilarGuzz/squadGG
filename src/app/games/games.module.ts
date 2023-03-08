import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { GamesRoutingModule } from './games-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CommentsModule } from '../comments/comments.module';







@NgModule({
  declarations: [
    GamesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GamesRoutingModule,
    RouterModule,    
    MatTableModule,
    MatSortModule,
    CommentsModule
  ],
  providers: [MatTableDataSource],
})
export class GamesModule { }

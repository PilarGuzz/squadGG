import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGameComponent } from './add-game/add-game.component';
import { DatatableGameComponent } from './datatable/datatable-game.component';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GamesModule } from '../games/games.module';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    AddGameComponent,
  DatatableGameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GamesModule,
    RouterModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [MatTableDataSource],
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGameComponent } from './game/add-game/add-game.component';
import { DatatableGameComponent } from './game/datatable/datatable-game.component';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GamesModule } from '../games/games.module';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { DatatableUsersComponent } from './users/datatable-users/datatable-users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminComponent } from './admin.component';
import { PrincipalComponent } from './principal/principal.component';
import { ReportsComponent } from './reports/reports.component';




@NgModule({
  declarations: [
    AddGameComponent,
    DatatableGameComponent,
    DatatableUsersComponent,
    AdminComponent,
    PrincipalComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GamesModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    AdminRoutingModule,
    MatPaginatorModule
  ],
  providers: [MatTableDataSource],
})
export class AdminModule { }

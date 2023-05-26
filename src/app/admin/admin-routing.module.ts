import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatableUsersComponent } from './users/datatable-users/datatable-users.component';
import { AddGameComponent } from './game/add-game/add-game.component';
import { DatatableGameComponent } from './game/datatable/datatable-game.component';
import { ReportsComponent } from './reports/reports.component';
import { PrincipalComponent } from './principal/principal.component';
import { AdminComponent } from './admin.component';
import { RolGuard } from '../_guards/rol.guard';
import { TokenGuard } from '../_guards/token.guard';

const routes: Routes = [

  { path:'',
    component: AdminComponent,
    children: [
      { path: 'dashboard',
      component: PrincipalComponent
      },
      { path: 'users',
      component: DatatableUsersComponent
      },
      { path: 'game/add',
      component: AddGameComponent
      },
      { path: 'game/edit',
      component: DatatableGameComponent
      },
      { path: 'report',
      component: ReportsComponent
      }

  ], canActivate: [TokenGuard]}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

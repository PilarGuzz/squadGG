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
import { GamesComponent } from '../games/games.component';
import { CommentsComponent } from '../comments/comments.component';

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
      { path: 'game',
      component: GamesComponent
      },
      { path: 'game/add',
      component: AddGameComponent
      },
      { path: 'game/edit',
      component: DatatableGameComponent
      },
      { path: 'game/:name/posts',
      loadChildren: () => import('../comments/comments.module').then(m => m.CommentsModule),
        pathMatch: 'full'
      },
      { path: 'report',
      component: ReportsComponent
      }

  ]}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

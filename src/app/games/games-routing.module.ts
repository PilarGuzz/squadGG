import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGameComponent } from '../admin/add-game/add-game.component';
import { DatatableGameComponent } from '../admin/datatable/datatable-game.component';
import { CommentsComponent } from './comments/comments.component';
import { GamesComponent } from './games.component';

const routes: Routes = [

  { path:'',
    children: [
      { path: '',
      component: GamesComponent
      },
      { path: ':name/posts',
      component: CommentsComponent
      },
      { path: 'admin/add',
      component: AddGameComponent
      },
      { path: 'admin/edit',
      component: DatatableGameComponent
      }

  ]}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)

  ]
})
export class GamesRoutingModule { }

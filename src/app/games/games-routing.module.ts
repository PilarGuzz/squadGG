import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGameComponent } from './admin/add-game/add-game.component';
import { DatatableComponent } from './admin/datatable/datatable.component';
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
      component: DatatableComponent
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

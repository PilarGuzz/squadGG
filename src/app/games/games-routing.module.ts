import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGameComponent } from '../admin/game/add-game/add-game.component';
import { DatatableGameComponent } from '../admin/game/datatable/datatable-game.component';
import { AddCommentComponent } from '../comments/add-comment/add-comment.component';
import { CommentsComponent } from '../comments/comments.component';
import { GamesComponent } from './games.component';

const routes: Routes = [

  { path:'',
    children: [
      { path: '',
      component: GamesComponent
      },
      {
        path: ':name/posts',
        loadChildren: () => import('../comments/comments.module').then(m => m.CommentsModule)
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

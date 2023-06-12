import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games.component';

const routes: Routes = [

  { path:'',
    children: [
      { path: '',
      component: GamesComponent
      },
      {
        path: ':name/posts',
        loadChildren: () => import('../comments/comments.module').then(m => m.CommentsModule),
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

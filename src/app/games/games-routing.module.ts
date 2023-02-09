import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

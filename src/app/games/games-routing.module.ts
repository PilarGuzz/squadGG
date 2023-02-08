import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games.component';

const routes: Routes = [

  { path:'',
    children: [
      { path: ':name/posts',
      component: GamesComponent
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

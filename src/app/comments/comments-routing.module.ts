import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentsComponent } from './comments.component';

const routes: Routes = [


    { path: '',
    component: CommentsComponent
    },
    { path: 'add',
    component: AddCommentComponent
    }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }

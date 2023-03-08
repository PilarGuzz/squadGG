import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from './comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AddCommentComponent,
    SideBarComponent,
    CommentComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    CommentsRoutingModule, 
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class CommentsModule { }

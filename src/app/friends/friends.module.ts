import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends.component';
import { ChatComponent } from './chat/chat.component';
import { RouterModule } from '@angular/router';
import { FriendsRoutingModule } from './friends-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FriendsComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FriendsRoutingModule,
    FormsModule
  ]
})
export class FriendsModule { }

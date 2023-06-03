import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends.component';
import { ChatComponent } from './chat/chat.component';
import { RouterModule } from '@angular/router';
import { FriendsRoutingModule } from './friends-routing.module';



@NgModule({
  declarations: [
    FriendsComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FriendsRoutingModule
  ]
})
export class FriendsModule { }

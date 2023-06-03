import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './friends.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
      {path: '',
      component: FriendsComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)

  ],
  // exports: [RouterModule]
})
export class FriendsRoutingModule { }

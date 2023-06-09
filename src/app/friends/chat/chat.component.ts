import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FRequest, FriendshipDto } from 'src/app/_interfaces/friendshipDto.interface';
import { SocketMessage, UserChat, Userdto } from 'src/app/_interfaces/user.interface';
import { ChatService } from 'src/app/_services/chat.service';
import { FriendshipService } from 'src/app/_services/friendship.service';
import { UserService } from 'src/app/_services/user.service';
const swalert = require('sweetalert2')


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() activeFriend$?: Observable<Userdto | null>;

  friend!: string;
  username!: string | null;
  friends: Userdto[] = [];
  userDto!: Userdto;
  friendsChat: UserChat[] = [];

  constructor(private friendServ: FriendshipService, private userSrv: UserService, private chatSrv: ChatService) { }

  ngOnInit(): void {
    this.activeFriend$?.subscribe(activeFriend => {
      if(activeFriend != null)
      this.friend = activeFriend.username;
    });
    
    this.username = localStorage.getItem('user');
    this.chatSrv.socket$?.subscribe(
      message => this.onMessage(message),
      err => console.log(err),
      () => console.log('Complete')
    );

  }
//funciones del chat
  private onMessage(message: MessageEvent<SocketMessage>): void {
    // Actualizar el DOM según el mensaje recibido
    const action = (message as any).action;
    const payload = (message as any).payload;

    if (action && payload) {
      switch (action) {
        case 'FRIENDS':
          this.friendsChat= payload.friends
          console.log(payload.friends);

          
          // Lógica para el mensaje PING
          break;
        case 'HELLO':
          // Lógica para el mensaje HELLO
          break;
        // 
      }

    }
  }

  //Recupero todos los amigos desde Java
  getFriends() {
    if (this.username != null) {
      this.friendServ.getFriendsByUser(this.username)
        .subscribe({
          next: (resp) => {
            this.friends = resp.data;
          }
        })
    }


  }

   //Obtengo el DTO de un usuario
  getUserDto(username: string) {
    this.userSrv.getUserDto(username)
      .subscribe((userData: Userdto) => {
        this.userDto = userData;
      }

      )

  }



}

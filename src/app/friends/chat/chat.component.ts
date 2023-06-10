import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FRequest, FriendshipDto } from 'src/app/_interfaces/friendshipDto.interface';
import { Message, SocketMessage, UserChat, Userdto } from 'src/app/_interfaces/user.interface';
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

  friend: string | undefined = undefined;
  username!: string | null;
  friends: Userdto[] = [];
  userDtoFriend!: Userdto;
  userDtoMain!: Userdto;
  friendsChat: UserChat[] = [];

  messages : Message[] = [];
  text: string = '';

  constructor(private friendServ: FriendshipService, private userSrv: UserService, private chatSrv: ChatService) { }

  ngOnInit(): void {
    this.activeFriend$?.subscribe(activeFriend => {
      if(activeFriend != null)
      this.friend = activeFriend.username;
      console.log(this.friend);
      this.getMessagesOneFriend()

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
          this.friendsChat = payload.friends
        
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

  getMessagesOneFriend(){
    const friend = this.friendsChat.find((friend: { username: string; }) => friend.username === this.friend); 
          if (friend) {
            this.messages = friend.messages; // Obtener los mensajes del amigo encontrado
            console.log(this.messages);
          } else {
            console.log('Amigo no encontrado');
          }

          if(this.friend != null && this.friend != '')
          this.getUserDto(this.friend).subscribe(userData => {
            if (userData) {
              this.userDtoFriend = userData;
            }
          });
          if(this.username != null && this.friend != '')
          this.getUserDto(this.username).subscribe(userData => {
            if (userData) {
              this.userDtoMain = userData;
            }
          });
  }

  sendMessage(message: string) {
    const messageObject = {
      action: 'SEND_MESSAGE',
      payload: {
        to: 'illoJuan1',
        message: message
      }
    };
    // const messageEvent = new MessageEvent('message', { data: JSON.stringify(messageObject) });
    // console.log(messageEvent);
    
    // this.chatSrv.socket$?.next(messageEvent);
    const messageString = JSON.stringify(messageObject);
    const messageEvent = new MessageEvent('message', {
    data: messageString,
    origin: window.location.origin
  });
  console.log(messageEvent);
  this.chatSrv.socket$?.next(messageEvent);
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
  getUserDto(username: string) : Observable<Userdto | undefined> {
    return this.userSrv.getUserDto(username);

  }

  getMessageClass(sender: string): string {
    return sender === this.username ? 'chat-right' : 'chat-left';
  }



}

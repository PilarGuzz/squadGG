import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  autoScroll: boolean = true;


  friend: string | undefined = undefined;
  username!: string | null;
  friends: Userdto[] = [];
  userDtoFriend!: Userdto;
  userDtoMain!: Userdto;
  friendsChat: UserChat[] = [];

  messages: Message[] = [];
  text: string = '';
  subscription?: Subscription;
  constructor(private friendServ: FriendshipService, private userSrv: UserService, private chatSrv: ChatService) { }

  ngOnInit(): void {
    
    this.activeFriend$?.subscribe(activeFriend => {
      if (activeFriend != null)
        this.friend = activeFriend.username;
      this.getMessagesOneFriend()

    });

    this.username = localStorage.getItem('user');

    const chatUrl = "wss://chat.squadgg.com?jwt=" + localStorage.getItem('jwt');
    this.chatSrv.connect(chatUrl);
    //Recupera toda la info de los chats
    this.subscription = this.chatSrv.getSubject()?.subscribe((msg: any) => {

      this.onMessage(JSON.parse(msg.data));


    });
  }


  private receiveNewMessage(message: Message): void {
    this.messages.push(message);
    this.scrollToBottom();

  }
  ngAfterViewChecked() {
    this.scrollToBottom();
 
  }

  ngOnDestroy(): void {
    this.chatSrv.disconnect();
    this.subscription?.unsubscribe();

  }

  //funciones del chat
  private onMessage(message: SocketMessage): void {

    const action = (message as any).action;
    const payload = (message as any).payload;


    if (action && payload) {
      switch (action) {
        case 'FRIENDS':
          this.friendsChat = payload.friends


          break;
        case 'SEND_MESSAGE':
          const sender = payload.username;
          const receivedMessage  = payload.message;
          const receiver = payload.receiver;

          const newMessage: Message = {
            username_sender: sender,
            message: receivedMessage ,
            date: new Date(),
            username_receiver: receiver
          };
          this.receiveNewMessage(newMessage);
          

          
          // ToDo: pintar mensaje en el chat correspondiente y añadirlo

          break;

        case 'USER_ONLINE':
          const usernameConnected = payload.username;
          // ToDo: buscar en mi colección de amigos y poner el estado a conectado

          break;


        case 'USER_OFFLINE':
          const usernameDisconnected = payload.username;
          // ToDo: buscar en mi colección de amigos y poner el estado a desconectado

          break;
        case 'HELLO':
          // Lógica para el mensaje HELLO
          break;

      }

    }
  }

  getMessagesOneFriend() {
    const friend = this.friendsChat.find((friend: { username: string; }) => friend.username === this.friend);   
    
    if (friend) {
      this.messages = friend.messages; // Obtener los mensajes del amigo encontrado
    } else {
      this.messages= []
      console.log('Amigo no encontrado');
    }

    if (this.friend != null && this.friend != '')
      this.getUserDto(this.friend).subscribe(userData => {
        if (userData) {
          this.userDtoFriend = userData;
        }
      });
    if (this.username != null && this.friend != '')
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
        to: this.friend,
        message: message
      }
    };

    this.chatSrv.sendMessage(messageObject);
    this.receiveNewMessage({date : new Date(), message, username_receiver: this.friend!, username_sender : this.username!});
    
    
    this.text = '';
    this.scrollToBottomAfterDelay();


  }



  //Obtengo el DTO de un usuario
  getUserDto(username: string): Observable<Userdto | undefined> {
    return this.userSrv.getUserDto(username);

  }

  getMessageClass(sender: string): string {
    return sender === this.username ? 'chat-right' : 'chat-left';
  }


  scrollToBottom() {
    const container = this.chatContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
 
  }

private scrollToBottomAfterDelay() {
  setTimeout(() => {
    this.scrollToBottom();
  }, 100);
}

}

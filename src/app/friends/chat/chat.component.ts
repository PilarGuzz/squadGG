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
    console.log("ngoninit");
    
    this.activeFriend$?.subscribe(activeFriend => {
      if (activeFriend != null)
        this.friend = activeFriend.username;
      console.log(this.friend);
      this.getMessagesOneFriend()

    });

    this.username = localStorage.getItem('user');

    const chatUrl = "wss://107.152.38.59:8080?jwt=" + localStorage.getItem('jwt');
    this.chatSrv.connect(chatUrl);
    //Recupera toda la info de los chats
    this.subscription = this.chatSrv.getSubject()?.subscribe((msg: any) => {
      console.log("ngoninit2");

      this.onMessage(JSON.parse(msg.data));
      //prueba
     // this.getMessagesOneFriend();

    });
  }


  private receiveNewMessage(message: Message): void {
    this.messages.push(message);
    this.scrollToBottom();

  }
  ngAfterViewChecked() {
    //prueba
    this.scrollToBottom();

    // setTimeout(() => {
    //   this.scrollToBottom();
    // }, 1000 );  
  }

  ngOnDestroy(): void {
    console.log("desconexion");
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

          console.log('Amigos: ' + payload.friends);

          break;
        case 'SEND_MESSAGE':
          const sender = payload.username;
          const receivedMessage  = payload.message;
          const receiver = payload.receiver;

          //prueba
          const newMessage: Message = {
            username_sender: sender,
            message: receivedMessage ,
            date: new Date(),
            username_receiver: receiver
          };
          this.receiveNewMessage(newMessage);
          console.log(this.messages);
          

          
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
        // 
      }

    }
  }

  getMessagesOneFriend() {
    const friend = this.friendsChat.find((friend: { username: string; }) => friend.username === this.friend);
    console.log("friendsChat: " + this.friendsChat);
    
    console.log("amigo dentro del getmees " + friend);
    
    
    if (friend) {
      this.messages = friend.messages; // Obtener los mensajes del amigo encontrado
      console.log("mensajes: " + this.messages);
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
//TODO mandar al user
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

  

    // Todo: insertes el mensaje en donde corresponde, buscar amigo, 
    // buscar los mensajes con el amigos y hacer un push en el array
  }

  //Recupero todos los amigos desde Java
  // getFriends() {
  //   if (this.username != null) {
  //     this.friendServ.getFriendsByUser(this.username)
  //       .subscribe({
  //         next: (resp) => {
  //           this.friends = resp.data;
  //         }
  //       })
  //   }


  // }

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

import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { SocketMessage } from '../_interfaces/user.interface';


const CHAT_URL = "ws://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages?: Subject<SocketMessage>;
  jwt:string | null= localStorage.getItem('jwt');
  socket$?: WebSocketSubject<MessageEvent>;
  //private readonly WS_ENDPOINT = 'ws://tu-direccion-websocket-endpoint';

  //private socket: WebSocket;


  constructor() {
    
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(CHAT_URL + '?jwt=' + this.jwt);
    }



    //crea la conexion
    // this.socket = new WebSocket('ws://localhost:8080?jwt=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJwaWxhciIsImV4cCI6MTY4Nzg5NTI0OCwicm9sZSI6IkFETUlOX1JPTEUiLCJlbWFpbCI6InBpbGFyMUBnbWFpbC5jb20ifQ.qAwjypLypwWHagNDWZwd3cmetn8ax2YUuEbg_ldjIpLhbK2BwAFj4MWxhElUV12-');

    // //evento que se ejecuta cvuando la conexion se ha creado(prescindible)
    // this.socket.onopen = (event) => {
    //   console.log('Conexión establecida');
    // };

    // //evento que se ejecuta cvuando la conexion da un error(prescindible)
    // this.socket.onerror = (error) => {
    //   console.log('WebSocket Error:', error);
    // };

    // this.socket.onmessage = (event) => {
    //   console.log(JSON.parse(event.data));
    // };

    // this.socket.onclose = (event) => {
    //   console.log('Conexión WebSocket cerrada:', event);
    // };
  }


  //  // Métodos para enviar mensajes al servidor
  //  public sendMessage(message: any): void {
  //   this.socket.send(JSON.stringify(message));
  // }

  // public closeConnection(): void {
  //   this.socket.close();
  // }

  
  

  public disconnect(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
  }


  private subject: Subject<MessageEvent> | undefined;

  public connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url: string): Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }


}

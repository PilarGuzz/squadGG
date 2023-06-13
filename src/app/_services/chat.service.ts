import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { SocketMessage } from '../_interfaces/user.interface';

const CHAT_URL = "wss://chat.squadgg.com";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  jwt: string | null = localStorage.getItem('jwt');
  private subject: Subject<SocketMessage> | undefined;

  constructor() {}

  public disconnect(): void {
    if (this.subject) {
      this.subject.complete();
      this.subject = undefined;
    }
  }

  public connect(url: string): Subject<SocketMessage> {
    
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);

    }
    return this.subject;
  }

  public sendMessage(msg: SocketMessage): void {

    if (this.subject) {
      this.subject.next(msg);
    }
  }

  public getSubject(): Subject<SocketMessage> | undefined {
    return this.subject;
  }

  public unsubscribe() {
    this.subject?.unsubscribe();
  }

  private create(url: string): Subject<SocketMessage> {
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
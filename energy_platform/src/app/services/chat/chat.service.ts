import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ChatMessage, Empty } from '../../protoc/generated/chat_pb';
import { ChatServiceClient } from '../../protoc/generated/chat_pb_service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly client: ChatServiceClient;
  private readonly messageSubject: Subject<ChatMessage>;

  constructor() {
    this.client = new ChatServiceClient('http://localhost:8080');
    this.messageSubject = new Subject<ChatMessage>();
  }

  sendMessage(sender:string, receiver: string, content: string): Observable<Empty> {
    const message = new ChatMessage();
    message.setSender(sender);
    message.setReceiver(receiver);
    message.setContent(content);
    message.setTimestamp(Date.now());
    console.log(message);
    return new Observable(observer => {
      this.client.sendMessage(message, (err, response) => {
        if (err) {
          console.error(err);
          observer.error(err);
        } else {
          response = new Empty();
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  receiveMessage(): Observable<ChatMessage> {
    return new Observable(observer => {
      const call = this.client.receiveMessage(new Empty());
      call.on('data', (message: ChatMessage) => {
        observer.next(message);
      });
      call.on('end', () => {
        observer.complete();
      });
    });
  }

}

/*import { Injectable } from '@angular/core';
import { ChatMessage, Empty } from '../../protoc/generated/chat_pb';
import { ChatServiceClient } from '../../protoc/generated/chat_pb_service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chatService: ChatServiceClient;

  constructor() {
    this.chatService = new ChatServiceClient("http://locqalhost:8080");
  }

  sendMessage(sender: string, receiver: string, content: string): void {
    const message = new ChatMessage();
    message.setSender(sender);
    message.setReceiver(receiver);
    message.setContent(content);
    message.setTimestamp(Date.now());
    this.chatService.sendMessage(message, (err, res) => {
      if (err) {
        console.error(err);
      }
    });
  }

  receiveMessage(): Observable<ChatMessage> {
    return new Observable(observer => {
      const call = this.chatService.receiveMessage(new Empty());
      call.on('data', (message: ChatMessage) => {
        observer.next(message);
      });
      call.on('end', () => {
        observer.complete();
      });
    });
  }
}*/


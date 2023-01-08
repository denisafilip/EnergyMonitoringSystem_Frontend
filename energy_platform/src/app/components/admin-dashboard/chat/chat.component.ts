import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {User} from "../../../models/user/user.model";
import {ChatService} from "../../../services/chat/chat.service";
import {ChatMessage, Empty} from "../../../protoc/generated/chat_pb";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponentAdmin implements OnInit {
  currentUser: User | null;

  msgMap: Map<string, ChatMessage[]>;
  sender: string = "";
  newMessage: string = "";
  client: string = "";

  constructor(private authService: AuthenticationService,
              private chatService: ChatService) {
    this.currentUser = this.authService.getCurrentUser();
    this.sender = this.currentUser.email;
    this.msgMap = new Map<string, ChatMessage[]>;
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.sender, this.client, this.newMessage)
      .subscribe((response: Empty) => {
          const message = new ChatMessage();
          message.setContent(this.newMessage);
          message.setSender(this.sender);
          message.setReceiver("");
          message.setTimestamp(Date.now());

          if (!this.msgMap.has(this.client)) {
            this.msgMap.set(this.client, [message]);
          } else {
            this.msgMap.get(this.client)?.push(message);
          }
          this.newMessage = "";
      });
  }

  ngOnInit(): void {
    this.newMessage = "";

    this.chatService.receiveMessage().subscribe(message => {
      const receiver = message.getReceiver();
      if (receiver == "") {
        this.client = message.getSender();
      }
      if (!this.msgMap.has(this.client)) {
        this.msgMap.set(this.client, [message]);
      } else {
        this.msgMap.get(this.client)?.push(message);
      }
      console.log(this.msgMap);
    });
  }

}

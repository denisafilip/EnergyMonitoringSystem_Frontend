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

  messages: ChatMessage[] = [];
  sender: string = "";
  newMessage: string = "";
  client: string = "";

  constructor(private authService: AuthenticationService,
              private chatService: ChatService) {
    this.messages = [];
    this.currentUser = this.authService.getCurrentUser();
    this.sender = this.currentUser.email;
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.sender, this.client, this.newMessage)
      .subscribe((response: Empty) => {
          const message = new ChatMessage();
          message.setContent(this.newMessage);
          message.setSender(this.sender);
          message.setReceiver("");
          message.setTimestamp(Date.now());
          this.messages.push(message);
          this.newMessage = "";
      });
  }

  ngOnInit(): void {
    this.newMessage = "";
    this.chatService.receiveMessage().subscribe(message => {
      this.messages.push(message);
    });
    const receiver = this.messages.at(0)?.getReceiver();
    if (receiver == "") {
      this.client ? this.messages.at(0)?.getSender() : "test@gmail.com";
    }
  }

}

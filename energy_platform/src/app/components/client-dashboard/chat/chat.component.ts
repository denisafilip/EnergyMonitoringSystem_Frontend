import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {User} from "../../../models/user/user.model";
import {ChatService} from "../../../services/chat/chat.service";
import {ChatMessage, Empty} from "../../../protoc/generated/chat_pb";
import {TypingService} from "../../../services/typing/typing.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  currentUser: User | null;

  messages: ChatMessage[] = [];
  sender: string = "";
  newMessage: string = "";

/*  chatForm: FormGroup;
  isTyping: boolean | undefined;
  isTypingSubscription: Subscription | undefined;

  typingSubscription : Subscription | undefined;*/

  constructor(private authService: AuthenticationService,
              public chatService: ChatService,
              private typingService: TypingService) {
    this.messages = [];
    this.currentUser = this.authService.getCurrentUser();
    this.sender = this.currentUser.email;
   /* this.chatForm = new FormGroup({
      textClient: new FormControl(null,[Validators.required])
    });

    this.typingService.startTypingEmitter.subscribe((receiver: string) => {
      if (this.sender === receiver) {
        this.isTyping = true;
      }

    })
    this.typingService.stopTypingEmitter.subscribe((receiver: string) => {
      if (this.sender === receiver) {
        this.isTyping = false;
      }
    })*/
  }

  sendMessage(msg: string): void {
    this.chatService.sendMessage(this.sender, "", msg)
      .subscribe((response: Empty) => {
          const message = new ChatMessage();
          message.setContent(msg);
          message.setSender(this.sender);
          message.setReceiver("");
          message.setTimestamp(Date.now());

          if (msg !== "typing" && msg !== "Read the message!") {
            this.messages.push(message);
            this.newMessage = "";
          }
      });
  }

  ngOnInit(): void {
    this.newMessage = "";
    this.chatService.receiveMessage().subscribe(message => {
      if (message.getReceiver() === this.sender || message.getSender() === this.sender) {
        if ((message.getContent() === "typing" || message.getContent() === "Read the message!") && this.sender !== message.getSender()) {
          this.messages.push(message);
        } else if (message.getContent() !== "typing" && message.getContent() !== "Read the message!") {
          this.messages.push(message);
        }
      }
    });
    this.sendMessage("Read the message!");


    //typing
/*    this.isTypingSubscription = this.chatForm.controls['text'].valueChanges
      .pipe(
        tap(()=> {
          this.typingService.startTypingEmitter.emit("");
        }),
        debounceTime(2000),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        console.log(value);
        this.typingService.stopTypingEmitter.emit("");
      });*/



    /*this.typingService.typingAdminEvent$.forEach(event => console.log(event));
    this.typingSubscription = this.typingService.typingAdminEvent$.subscribe((isTyping: string) => {
      console.log("subscriber...");
      console.log(isTyping);
      this.isTyping = isTyping === "yes";
      console.log(this.isTyping);
    });*/
  }

}

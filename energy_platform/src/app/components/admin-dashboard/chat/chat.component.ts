import {Component, OnInit} from '@angular/core';
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
export class ChatComponentAdmin implements OnInit {
  currentUser: User | null;

  msgMap: Map<string, ChatMessage[]>;
  sender: string = "";
  newMessage: string = "";

/*  chatForm: FormGroup;
  isTyping: boolean | undefined;
  isTypingSubscription: Subscription | undefined;

  typingSubscription : Subscription | undefined;*/

  constructor(private authService: AuthenticationService,
              public chatService: ChatService,
              private typingService: TypingService) {
    this.currentUser = this.authService.getCurrentUser();
    this.sender = this.currentUser.email;
    this.msgMap = new Map<string, ChatMessage[]>;
    /*this.chatForm = new FormGroup({
      textAdmin: new FormControl(null,[Validators.required])
    });*/

    /*this.typingService.startTypingEmitter.subscribe((sender: string) => {
      console.log(sender);
      if (sender === "") {
        this.isTyping = true;
      }

    })
    this.typingService.stopTypingEmitter.subscribe((sender: string) => {
      console.log("hello!");
      if (sender === "") {
        this.isTyping = false;
      }
    })*/
  }

  /*typeNotification(client: string): void {
    this.chatService.typeMessage(this.sender, client)
      .subscribe((response: Empty) => {
        this.typing = true;
      });
  }*/

  sendMessage(client: string, message: string): void {
    this.chatService.sendMessage(this.sender, client, message)
      .subscribe((response: Empty) => {
          const msg = new ChatMessage();
          msg.setContent(message);
          msg.setSender(this.sender);
          msg.setReceiver("");
          msg.setTimestamp(Date.now());

          if (message !== "typing" && message !== "Read the message!") {
            if (!this.msgMap.has(client)) {
              this.msgMap.set(client, [msg]);
            } else {
              this.msgMap.get(client)?.push(msg);
            }
            this.newMessage = "";
          }
      });
  }

  ngOnInit(): void {
    this.newMessage = "";
    let client = "";

    this.chatService.receiveMessage().subscribe(message => {
      const receiver = message.getReceiver();
      if (receiver == "") {
        client = message.getSender();
      } else {
        client = message.getReceiver();
      }

      if ((message.getContent() === "typing" || message.getContent() === "Read the message!") && this.sender !== message.getSender()) {
        if (!this.msgMap.has(client)) {
          this.msgMap.set(client, [message]);
        } else {
          this.msgMap.get(client)?.push(message);
        }
      } else if (message.getContent() !== "typing" && message.getContent() !== "Read the message!") {
        if (!this.msgMap.has(client)) {
          this.msgMap.set(client, [message]);
        } else {
          this.msgMap.get(client)?.push(message);
        }
      }
      this.sendMessage(client, "Read the message!");
      console.log(this.msgMap);
    });

    //typing
    /*this.isTypingSubscription = this.chatForm.controls['textAdmin'].valueChanges
      .pipe(
        tap(() => {
          console.log("writing!");
          this.typingService.startTypingEmitter.emit("test@yahoo.com");
        }),
        debounceTime(2000),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        console.log(value);
        this.typingService.stopTypingEmitter.emit("test@yahoo.com");
      });*/

    /*this.typingService.clientEventEmitter.subscribe((isTyping: boolean) => {
      this.isTyping = isTyping;
    })*/

    /*this.typingSubscription = this.typingService.typingClientEvent$.subscribe((isTyping: string) => {
      this.isTyping = isTyping === "yes";
    });*/
  }

}

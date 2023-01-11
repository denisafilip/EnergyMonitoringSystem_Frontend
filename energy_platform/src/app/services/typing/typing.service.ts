import {EventEmitter, Injectable, Output} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TypingService {

  typingAdminSubject: Subject<any> = new Subject<any>();
  typingClientSubject: Subject<any> = new Subject<any>();
  @Output() startTypingEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() stopTypingEmitter: EventEmitter<any> = new EventEmitter<any>();

  clientIsTyping(event: any) {
    this.typingClientSubject.next(event);
  }

  adminIsTyping(event: any) {
    this.typingAdminSubject.next(event);
  }

  get typingAdminEvent$ () {
    return this.typingAdminSubject.asObservable();
  }

  get typingClientEvent$ () {
    return this.typingClientSubject.asObservable();
  }

  constructor() { }
}

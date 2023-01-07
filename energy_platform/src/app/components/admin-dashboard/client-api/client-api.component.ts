import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user/user.model";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-client-api',
  templateUrl: './client-api.component.html',
  styleUrls: ['./client-api.component.css']
})
export class ClientApiComponent implements OnInit {

  users?: User[];
  currentUser: User = {email:""};
  currentIndex = -1;
  email = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {email:""};
    this.currentIndex = -1;
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  removeAllUsers(): void {
    this.userService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchEmail(): void {
    this.currentUser = {email:""};
    this.currentIndex = -1;

    this.userService.findByEmail(this.email)
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}

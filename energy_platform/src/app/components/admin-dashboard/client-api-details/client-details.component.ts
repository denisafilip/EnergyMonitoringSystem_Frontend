import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user/user.model";
import {UserService} from "../../../services/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-client-api-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentUser: User = {
    email: '',
    name: '',
    password: '',
    role: ''
  };

  message = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params["id"]);
    }
  }

  getUser(id: string): void {
    this.userService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateEmail(email: string): void {
    const data = {
      email: email,
      name: this.currentUser.name,
      role: this.currentUser.role,
    };

    this.message = '';

    this.userService.update(this.currentUser.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentUser.email = email;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateUser(): void {
    this.message = '';
    console.log(this.currentUser.id)
    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This client was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dashboard/admin/clients']);
        },
        error: (e) => console.error(e)
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CURRENT_USER, SESSION } from '../../../constants/storage';
import { UserInfoModel } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public userList: UserInfoModel[] = [];
  public current_user: UserInfoModel;
  private smarthome: string = "smartHome";
  url: string = "";

  constructor(private router: Router, private userService: UserService) {
    this.userService.userList$.subscribe(userList => (this.userList = userList)); this.userService.getUserInfo();
  }

  ngOnInit() {
  }

  onSelect(user: UserInfoModel) {
    localStorage.setItem(SESSION, JSON.stringify(user));
    if (user.admin == true) {
      this.current_user = localStorage[CURRENT_USER] ? JSON.parse(localStorage.getItem(CURRENT_USER)) : null;
      console.log(this.current_user);
      if (this.current_user && this.current_user.nom === user.nom) {
        console.log(this.current_user.nom);
        console.log(user.nom);
        this.router.navigate(['/visualiseur']);
      }
      else this.router.navigate(['/auth']);
    } else {
      //rediriger à la declaration
      alert("redirection vers la declaration")
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CURRENT_USER } from '../../constants/storage';
import { UserInfoModel } from '../../models/user';
import { AuthentificationService } from '../../services/authentification.service';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  authentified: boolean;

  public userList: UserInfoModel[] = [];
  showSelected: boolean;

  constructor(private userService: UserService, private router: Router,
    private authentificationService: AuthentificationService) {
    this.userService.userList$.subscribe(userList => (this.userList = userList)); this.userService.getUserInfo();
    this.authentified = true;
  }

  ngOnInit() {
  }

  logOutSession() {
    this.authentificationService.logout();
    localStorage.removeItem(CURRENT_USER);
    this.router.navigate(['/users']);
  }

  famillySettings() {
    this.router.navigate(['/settings']);
  }

  home() {
    this.router.navigate(['/visualiser']);
  }

  smarthome() {
    this.router.navigate(['/iotpanel']);
  }
}

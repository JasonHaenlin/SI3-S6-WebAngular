import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { URL_SERVER } from "../constants/urls";
import { AvatarModel, UserInfoModel, UserWithPassword } from "../models/user";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class UserService {

  public userList$: BehaviorSubject<UserInfoModel[]>;

  public avatars$: BehaviorSubject<AvatarModel[]>;

  private route = "/utilisateurs/info";

  private filterState = new BehaviorSubject<string>('');
  public filterState$ = this.filterState.asObservable();

  constructor(private http: HttpClient) {
    this.userList$ = new BehaviorSubject([]);
    this.avatars$ = new BehaviorSubject([]);
  }

  getUserInfo() {
    this.http.get<UserInfoModel[]>(URL_SERVER + this.route).subscribe((users) => this.userList$.next(users));
  }

  getById(id: number) {
    console.log(URL_SERVER + this.route + id);
    return this.http.get(URL_SERVER + this.route + id);
  }

  create(user: UserInfoModel) {
    console.log("envoi de la requete");
    return this.http.post(URL_SERVER + this.route, user, httpOptions);
  }

  delete(id: number) {
    console.log("Service to send request");
    console.log(URL_SERVER + this.route + "/id=" + id);
    return this.http.delete(URL_SERVER + this.route + "/id=" + id);
  }

  getAvatars() {
    return this.http.get<AvatarModel[]>(URL_SERVER + "/avatars").subscribe((avatar) => this.avatars$.next(avatar));
  }

  updateUserWithOutAdminChange(newUser: UserInfoModel, newPassword: string) {
    var password: string;
    if (newPassword != undefined && newUser.admin) {
      password = newPassword;
    }
    console.log(newPassword);

    var newUserToSend: UserWithPassword = {
      "id": newUser.id,
      "nom": newUser.nom,
      "admin": newUser.admin,
      "avatar": newUser.avatar,
      "password": newPassword
    };
    return this.http.put<UserWithPassword>(URL_SERVER + '/utilisateur/update', newUserToSend, httpOptions);
  }

  updateUserWithAdminChange(newUser: UserInfoModel, newPassword: string) {
    var password: string;
    if (newPassword != undefined && newUser.admin) {
      password = newPassword;
    } else {
      password = "";
    }

    var newUserToSend: UserWithPassword = {
      "id": newUser.id,
      "nom": newUser.nom,
      "admin": newUser.admin,
      "avatar": newUser.avatar,
      "password": password
    };
    console.log(newUserToSend.password);
    return this.http.put<UserWithPassword>(URL_SERVER + '/utilisateur/update/admin', newUserToSend, httpOptions);
  }

  addUser(newUser: UserInfoModel) {
    return this.http.post<UserInfoModel>(URL_SERVER + '/utilisateur/add', newUser, httpOptions);
  }

  getUserAdminPassword(id: number) {
    return this.http.get(URL_SERVER + '/admin/password/id=' + id);
  }

}

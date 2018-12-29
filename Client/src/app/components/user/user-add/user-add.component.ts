import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AvatarModel, UserInfoModel } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  add() {
    const modalRef = this.modalService.open(AddingDialog);
    modalRef.result.then(() => {
      this.notifyParent.emit();
    });
  }

}


@Component({
  selector: 'add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./user-add.component.css'],

})

export class AddingDialog {

  public avatars: AvatarModel[];
  private newUser: UserInfoModel = { 'id': 0, 'nom': "", 'avatar': "", 'admin': false };
  private showError: boolean = false;
  private basicAvatar: string = "/img/avatars/default/adults/man-1.png";
  private isAdmin: boolean = false;

  event: any;

  private errorAvatar: boolean = false;
  private errorName: boolean = false;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private userService: UserService) {
    this.userService.avatars$.subscribe(avatars => (this.avatars = avatars));
    this.userService.getAvatars();
  }

  ngOnInit() {
    console.log(this.avatars);
    console.log(this.userService.avatars$);
  }

  changeAvatar(avatar: AvatarModel, event: any) {
    //Enlever la derniere bordure enregistrée
    if (this.event != undefined) {
      this.event.target.style.border = "";
    }
    console.log(avatar.image_file);
    this.basicAvatar = avatar.image_file;
    event.target.style.border = "3px solid red";

    //Enregistrer la nouvelle bordure s'il y a chgmt d'avatar
    this.event = event;
  }

  confirm() {
    let nom = (<HTMLInputElement>document.getElementById("newUserName")).value;
    if (nom.length == 0) {
      //pas de nom entré
      this.errorName = true;
    } else {
      this.newUser.nom = nom;
      this.errorName = false;
    };

    if (this.basicAvatar == undefined) {
      //pas d'avatar choisi
      this.errorAvatar = true;
    } else {
      this.newUser.avatar = this.basicAvatar;
      this.errorAvatar = false;
    }

    if (!this.errorAvatar && !this.errorName) {
      this.userService.addUser(this.newUser).subscribe();
      this.activeModal.close(this.newUser);
    }
  }
}

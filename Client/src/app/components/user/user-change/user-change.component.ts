import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { AvatarModel, UserInfoModel } from '../../../models/user';

@Component({
  selector: 'app-user-change',
  templateUrl: './user-change.component.html',
  styleUrls: ['./user-change.component.css']
})
export class UserChangeComponent {

  @Input() user: UserInfoModel;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal, private userService: UserService) {
  }

  sendEventOnclose() {
    this.notifyParent.emit();
  }

  modify() {
    const modalRef = this.modalService.open(ModificationDialog);
    modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.userChanged = JSON.parse(JSON.stringify(this.user));
    modalRef.result.then(() => {
      this.sendEventOnclose();
    });
  }


}

@Component({
  selector: 'modification-dialog',
  templateUrl: './modification-dialog.component.html',
  styleUrls: ['./user-change.component.css'],

})
export class ModificationDialog {

  user: UserInfoModel;
  public avatars: AvatarModel[];
  userChanged: UserInfoModel;
  newPassword: string = "vfeh'iuhu_è_àè)_èè)_fefre_g)re_g";

  event: any;

  private errorMdp: boolean = false;
  private errorAvatar: boolean = false;
  private errorName: boolean = false;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private userService: UserService) {
    this.userService.avatars$.subscribe(avatars => (this.avatars = avatars)); this.userService.getAvatars();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (!this.user.admin) {
      this.newPassword = "";
    }
  }

  changeAvatar(avatar: AvatarModel, event: any) {
    //Enlever la derniere bordure enregistrée
    if (this.event != undefined) {
      this.event.target.style.border = "";
    }
    console.log(avatar.image_file);
    this.userChanged.avatar = avatar.image_file;
    event.target.style.border = "3px solid red";

    //Enregistrer la nouvelle bordure s'il y a chgmt d'avatar
    this.event = event;
  }

  confirm() {

    let nom = (<HTMLInputElement>document.getElementById("newUserName")).value;
    let password;

    if (nom.length == 0) {
      //pas de nom entré
      this.errorName = true;
    } else {
      this.errorName = false;
    }

    if (this.userChanged.admin) {
      password = (<HTMLInputElement>document.getElementById("password")).value;
      if (password.length == 0 || (password == "vfeh'iuhu_è_àè)_èè)_fefre_g)re_g" && !this.userChanged.admin)) {
        this.errorMdp = true;
      } else {
        this.errorMdp = false;
      }
    } else {
      this.errorMdp = false;
    }

    if (!this.errorName && !this.errorMdp) {

      if (this.userChanged.admin == this.user.admin) {
        this.userService.updateUserWithOutAdminChange(this.userChanged, password).subscribe();
      } else {
        this.userService.updateUserWithAdminChange(this.userChanged, password).subscribe();
      }
      this.user.nom = this.userChanged.nom;
      this.user.admin = this.userChanged.admin;
      this.user.avatar = this.userChanged.avatar;
      this.activeModal.close();
    }
  }
}

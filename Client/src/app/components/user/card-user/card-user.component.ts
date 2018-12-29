import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoModel } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent implements OnInit {

  @Input() user: UserInfoModel;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(private dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
  }

  onModalClose() {
    this.ngOnInit();
  }

  openDialog(): void {
    console.log("popup open");
    let dialogRef = this.dialog.open(PopupComponent, {
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      console.log(dialogRef.componentInstance.data);
      if (dialogRef.componentInstance.data) {
        this.userService.delete(this.user.id).subscribe();
        console.log("request sended to delete the user :" + this.user.id);
        this.notifyParent.emit();
      }
    });

  }


}

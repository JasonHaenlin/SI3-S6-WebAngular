import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'avancement',
  templateUrl: './avancement.component.html',
  styleUrls: ['./avancement.component.css']
})
export class AvancementComponent implements OnInit {
  @Input() etat: String;
  @Output() updateGravity: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  notifyParentUpdateGravity() {
    var newEtat = this.etat;
    if (this.etat === "En attente")
      newEtat = "Pris en compte";
    else if (this.etat === "Pris en compte")
      newEtat = "En cours";
    else if (this.etat === "En cours")
      newEtat = "Terminé";
    this.updateGravity.emit(newEtat);
  }

}

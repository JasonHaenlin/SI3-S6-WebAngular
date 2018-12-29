import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IncidentModel } from '../../../models/incident';
import { FilterService } from '../../../services/filter.service';
import { IncidentService } from '../../../services/incident.service';
import { PopupComponent } from '../../popup/popup.component';


@Component({
  selector: 'app-card-incident',
  templateUrl: './card-incident.component.html',
  styleUrls: ['./card-incident.component.css']
})
export class CardIncidentComponent implements OnInit {

  @Input() incident: IncidentModel;
  @Input() avatar: string;
  @Output() removeEvent = new EventEmitter<IncidentModel>();

  constructor(private dialog: MatDialog, private filterService: FilterService, private incidentService: IncidentService) {
  }

  ngOnInit() {
  }

  openDialog(incident: IncidentModel): void {
    const dialogRef = this.dialog.open(PopupComponent, {
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(dialogRef.componentInstance.data);
      if (dialogRef.componentInstance.data) { this.removeEvent.next(incident) }
    });
  }
  selectUser(nom, $event) {
    this.filterService.updateFilterUser(nom, $event);
  }

  onGravityChange(state) {
    console.log(state);
    this.incident.etat = state;
    this.incidentService.save(this.incident).subscribe();
  }
}

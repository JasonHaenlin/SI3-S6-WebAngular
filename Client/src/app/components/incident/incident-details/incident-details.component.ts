import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IncidentModel } from '../../../models/incident';
import { criticiteModel, incidentStatesModel, localisationModel, userModel } from '../../../models/incidentsModels';
import { NotificationModel } from '../../../models/notification';
import { FilterService } from '../../../services/filter.service';
import { IncidentService } from '../../../services/incident.service';
import { NotificationService } from '../../../services/notification.service';


@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './incident-details.content.html',
  styleUrls: ['./incident-details.component.css']

})
export class NgbdModalContent {
  private incident: IncidentModel;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  modifier() {
    this.activeModal.close();
    const modalRef = this.modalService.open(NgbdModalModif);
    modalRef.componentInstance.incident = this.incident;
    modalRef.componentInstance.declaration = this.incident.declaration;
    modalRef.componentInstance.ampleur = this.incident.ampleur;
    modalRef.componentInstance.lieu = this.incident.lieu;
    modalRef.componentInstance.etat = this.incident.etat;
  }

  notifier() {
    this.activeModal.close();
    const modalRef = this.modalService.open(NgbdModalNotif);
    modalRef.componentInstance.incident = this.incident;

  }
}

@Component({
  selector: 'ngbd-modal-notif',
  templateUrl: './notif-modal.html',
  styleUrls: ['./incident-details.component.css']

})
export class NgbdModalNotif {

  @Output() removeEvent = new EventEmitter<IncidentModel>();

  private incident: IncidentModel;
  private notification: NotificationModel;
  private users: userModel[];

  private destinataires: string[];
  private description: string = "";
  private errorField: boolean = false;


  constructor(public activeModal: NgbActiveModal, private NotificationService: NotificationService, private modalService: NgbModal, private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.users$.subscribe(result => this.users = result);
    this.filterService.getUsers();
    console.log(this.incident);
  }
  annuler() {
    this.activeModal.close();
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.incident = this.incident;
  }

  valider() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser")).nom;
    var textField = (<HTMLInputElement>document.getElementById("notifDescription")).value;

    console.log("actual user : " + currentUser);
    console.log("destinantaire : " + this.destinataires);
    if (this.destinataires != undefined && currentUser != "" && textField.length != 0) {
      this.notification = {
        id_incident: this.incident.id_incident,
        id_notification: 0,
        auteur: currentUser,
        destinataires: this.destinataires,
        description: this.description
      }
      this.activeModal.close();
      this.NotificationService.addNotification(this.notification).subscribe();
      this.NotificationService.addNotificationTargets(this.notification).subscribe();
      console.log("notification HTTP request sent");
      this.errorField = false;
    } else {
      console.log("on est passé par la");

      this.errorField = true;
    }

  }
}


@Component({
  selector: 'ngbd-modal-modif',
  templateUrl: './incident-details.modif.html',
  styleUrls: ['./incident-details.component.css']
})
export class NgbdModalModif {

  @Output() removeEvent = new EventEmitter<IncidentModel>();

  private incident: IncidentModel;
  private criticites: criticiteModel[];
  private users: userModel[];
  private localisation: localisationModel[];
  private state: incidentStatesModel[];

  private declaration: string;
  private ampleur: string;
  private lieu: string;
  private etat: string;


  constructor(public activeModal: NgbActiveModal, private incidentService: IncidentService, private modalService: NgbModal, private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.criticites$.subscribe(result => this.criticites = result);
    this.filterService.getCriticites();
    this.filterService.users$.subscribe(result => this.users = result);
    this.filterService.getUsers();
    this.filterService.localisation$.subscribe(result => this.localisation = result);
    this.filterService.getLocalisation();
    this.filterService.incidentStates$.subscribe(result => this.state = result);
    this.filterService.getIncidentStates();

  }
  annuler() {
    this.activeModal.close();
    const modalRef = this.modalService.open(NgbdModalContent);

    this.incident.declaration = this.declaration;
    this.incident.ampleur = this.ampleur;
    this.incident.lieu = this.lieu;
    this.incident.etat = this.etat;

    modalRef.componentInstance.incident = this.incident;
    console.log(this.incident);
  }
  enregistrer(): void {
    this.activeModal.close();
    this.incidentService.save(this.incident).subscribe();
  }
}



@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './incident-details.component.html',
})
export class NgbdModalComponent {
  @Input() incident: IncidentModel;

  constructor(private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.incident = this.incident;
  }

}

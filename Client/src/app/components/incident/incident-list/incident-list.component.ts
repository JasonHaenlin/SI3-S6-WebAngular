import { animate, Component, OnInit, state, style, transition, trigger } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IncidentModel } from '../../../models/incident';
import { UserInfoModel } from '../../../models/user';
import { FilterService } from '../../../services/filter.service';
import { IncidentService } from '../../../services/incident.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css'],
  animations: [
    trigger('shrinkOut', [
      state('in', style({ height: '*' })),
      transition(':leave', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ])
    ])
  ]
})
export class IncidentListComponent implements OnInit {

  terms: string;
  filterState: string;
  filterCriticite: string;
  filterUser: string;
  image: string = "/img/avatars/default/kids/boy-1.png";
  public incidentList: IncidentModel[] = [];
  public userList: UserInfoModel[] = [];

  subscription: Subscription;

  constructor(private incidentService: IncidentService, private filterService: FilterService, private userService: UserService) {
    this.incidentService.incidentList$.subscribe(incidentList => (this.incidentList = incidentList));
    this.userService.userList$.subscribe(userList => (this.userList = userList));
    this.subscription = this.filterService.updateChange$.subscribe(terms => this.terms = terms);
    this.filterService.filterState$.subscribe(result => this.filterState = result);
    this.filterService.filterCriticite$.subscribe(result => this.filterCriticite = result);
    this.filterService.filterUser$.subscribe(result => this.filterUser = result);
  }

  ngOnInit() {
    this.incidentService.getIncident();
  }

  delete(incident: IncidentModel): void {
    console.log('je suis passé par là');
    this.removeIncidentFromList(incident);
    this.incidentService.deleteIncident(incident).subscribe();
  }

  removeIncidentFromList = (incident: IncidentModel): void => {
    this.incidentList = this.incidentList.filter(incidentList => incidentList.id_incident !== incident.id_incident);
  }
}

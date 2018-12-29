import { Component, OnInit, Output, EventEmitter, Input, Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { IncidentModel } from '../../models/incident';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IncidentService } from '../../services/incident.service';
import { FilterService } from '../../services/filter.service';
import { incidentStatesModel, userModel, criticiteModel } from '../../models/incidentsModels';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})

@Injectable()
export class SideBarComponent implements OnInit {

  private search: string = "";
  private incidentStates : incidentStatesModel[];
  private users : userModel[];
  private criticites : criticiteModel[]

  constructor(private filterService: FilterService) { }

  onKey(event: any) {
    this.search = event.target.value;
    this.filterService.updateSearch(this.search);
  }
  ngOnInit() {
   this.filterService.incidentStates$.subscribe(result => this.incidentStates = result);
   this.filterService.getIncidentStates();
   this.filterService.users$.subscribe(result => this.users = result);
   this.filterService.getUsers();
   this.filterService.criticites$.subscribe(result => this.criticites = result);
   this.filterService.getCriticites();
  }

  changedFilterState(filterState : incidentStatesModel, event : any){
    console.log(filterState);
    this.filterService.updateFilterEtat(filterState.etat, event);
  }

  changedFilterCriticite(filterCriticite : criticiteModel, event : any){
    console.log(filterCriticite);
    this.filterService.updateFilterCriticite(filterCriticite.ampleur, event);
  }

  changedFilterUser(filterUser : userModel, event : any){
    console.log(filterUser);
    this.filterService.updateFilterUser(filterUser.nom, event);
  }
}

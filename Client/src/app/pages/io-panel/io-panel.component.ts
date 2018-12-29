import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { IotService } from '../../services/iot.service';


@Component({
  selector: 'app-io-panel',
  templateUrl: './io-panel.component.html',
  styleUrls: ['./io-panel.component.css']
})
export class IoPanelComponent implements OnInit {

  private lightState: number = 0;

  subTitle: string = "Interface de la maison"

  constructor(private iotService: IotService, private incidentService: IncidentService) {

  }

  ngOnInit() {
    this.iotService.getLightsDescription();
  }
}

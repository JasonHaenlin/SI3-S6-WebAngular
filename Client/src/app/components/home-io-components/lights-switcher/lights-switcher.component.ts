import { Component, OnInit } from '@angular/core';
import { lightDescriptionModel } from '../../../models/homeio/lightModel';
import { IotService } from '../../../services/iot.service';

@Component({
  selector: 'app-lights-switcher',
  templateUrl: './lights-switcher.component.html',
  styleUrls: ['./lights-switcher.component.css']
})
export class LightsSwitcherComponent implements OnInit {

  private lightDescription: lightDescriptionModel[] = [];

  constructor(private iotService: IotService) {
    this.iotService.lightDescriptionList$.subscribe(lightDescription => this.lightDescription = lightDescription);
  }

  ngOnInit() {
    setTimeout(() => {
      this.iotService.getLightsDescription();
      // this.ngOnInit();
    }, 1000);
  }


  switchAllLights(state: boolean) {
    console.log("light : " + state);
    this.iotService.postAllLights(state).subscribe();
    this.ngOnInit();
  }

}

import { Component, OnInit } from '@angular/core';
import { IotService } from '../../../services/iot.service';

@Component({
  selector: 'app-smart-light',
  templateUrl: './smart-light.component.html',
  styleUrls: ['./smart-light.component.css']
})
export class SmartLightComponent implements OnInit {

  private texte: string = "Désactivée";


  constructor(private iotService: IotService) { }

  ngOnInit() {
  }

  changeText(event: any) {
    var temp: string = this.texte;
    if (temp == "Activée") {
      this.texte = "Désactivée";
      this.iotService.smartLight(0).subscribe();
    }
    else {
      this.texte = "Activée";
      this.iotService.smartLight(1).subscribe();
    }

  }
}

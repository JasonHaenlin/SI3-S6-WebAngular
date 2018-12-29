import { Component, OnInit, Input } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { lightDescriptionModel, lightModel } from '../../../models/homeio/lightModel';
import { IotService } from '../../../services/iot.service';

@Component({
  selector: 'app-zone-light',
  templateUrl: './zone-light.component.html',
  styleUrls: ['./zone-light.component.css']
})
export class ZoneLightComponent implements OnInit {

  @Input() entree : lightDescriptionModel;
  private lieu : string;
  private active : number;
  private texte : string = "Rien";

  constructor(private iotService: IotService) { 
    
  }

  ngOnInit() {
    this.lieu = this.entree.description;
    this.active = this.entree.light;
    if(this.active){ 
      this.texte = "Allumé";
    }else{ 
      this.texte = "Eteint"; 
    }
  }

  changeText(event :any){
    var light : lightModel;
    var temp : string = this.texte;
    if(temp == "Eteint"){ 
      this.texte = "Allumé";
      light = {
        zone : this.entree.zone,
        light: 1
      };
      this.iotService.postLight(light).subscribe();
  
    }else if(temp == "Allumé"){
      this.texte = "Eteint";
      light = {
        zone : this.entree.zone,
        light: 0
      };
      this.iotService.postLight(light).subscribe();
    }
  }

}

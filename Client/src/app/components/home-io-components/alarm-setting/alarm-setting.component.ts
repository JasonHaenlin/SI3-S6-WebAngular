import { Component, OnInit } from '@angular/core';
import { alarmTimePeriodModel } from '../../../models/homeio/alarmModel';
import { IotService } from '../../../services/iot.service';

@Component({
  selector: 'app-alarm-setting',
  templateUrl: './alarm-setting.component.html',
  styleUrls: ['./alarm-setting.component.css']
})
export class AlarmSettingComponent implements OnInit {

  public alarm: alarmTimePeriodModel[] = [];
  
  constructor(private iotService: IotService) {
    this.iotService.listAlarmPeriod$.subscribe(alarm => this.alarm = alarm);
  }

  ngOnInit() {
    this.iotService.getAlarmTimePeriod();
  }

}

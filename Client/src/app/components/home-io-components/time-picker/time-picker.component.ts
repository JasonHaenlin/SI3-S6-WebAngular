import { Component, Input, OnInit } from '@angular/core';
import { alarmTimePeriodModel } from '../../../models/homeio/alarmModel';
import { IotService } from '../../../services/iot.service';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {

  @Input() time: alarmTimePeriodModel;
  private timeSend: alarmTimePeriodModel;

  timeBegin;
  timeEnd;
  private error: boolean = false;
  private validate: boolean = false;
  private resetAlarm: boolean = false;


  constructor(private iotService: IotService) {
    // iotService.getAlarmState().subscribe(state => (this.activateAlarm = state));
  }

  ngOnInit() {
    this.updateTime(this.time);
  }

  updateTime(time) {
    const t = time.time_start.split(":");
    this.timeBegin = { hour: t[0], minute: t[1] };
    const te = time.time_end.split(":");
    this.timeEnd = { hour: te[0], minute: te[1] };
  }

  confirm() {
    if (this.timeBegin.hour == this.timeEnd.hour && this.timeBegin.minute == this.timeEnd.minute) {
      this.error = true;
    } else {
      this.error = false;
      var timesToSend: alarmTimePeriodModel = {
        time_start: this.timeBegin.hour + ":" + this.timeBegin.minute,
        time_end: this.timeEnd.hour + ":" + this.timeEnd.minute,
      };
      console.log(timesToSend);
      this.iotService.postAlarmTimePeriod(timesToSend).subscribe();
      this.validate = true;
      setTimeout(() => {
        this.validate = false;
      }, 5000);
    }
  }

  stopSiren(){
    this.iotService.cutAlarm().subscribe();
  }

  turnOffAlarmSystem() {
    this.resetAlarm = true;
    this.iotService.alarmDisable().subscribe();
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
    setTimeout(() => {
      this.resetAlarm = false;
    }, 5000);
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gravity-gauge',
  templateUrl: './gravity-gauge.component.html',
  styleUrls: ['./gravity-gauge.component.css']
})
export class GravityGaugeComponent implements OnInit {

  @Input() ampleur: string;

  constructor() { }

  ngOnInit() {
  }

}

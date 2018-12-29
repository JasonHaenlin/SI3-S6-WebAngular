import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../../services/filter.service';


@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  private user: string;
  constructor(private filterService: FilterService) {

  }
  ngOnInit() {
    this.filterService.filterUser$.subscribe(result => this.user = result);
  }
  back() {
    console.log("efv");
  }
  unselect($event) {
    this.filterService.updateFilterUser(this.user, $event)
  }
}

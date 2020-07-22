import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.css']
})
export class CampaignCardComponent implements OnInit {

  @Input() id: string;
  @Input() title: string;
  @Input() description: string;
  @Input() creation_date: string;
  @Input() target_date: string;
  @Input() sizes: string;
  @Input() image: string;

  daysLeft:number;

  constructor() {
  }

  ngOnInit() {
    this.daysLeft = Math.floor(( Date.parse(this.target_date) - Date.parse(this.creation_date) ) / 86400000);
    console.log(this.sizes, this.creation_date)
  }

}

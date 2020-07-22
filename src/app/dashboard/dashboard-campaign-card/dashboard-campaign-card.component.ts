import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-campaign-card',
  templateUrl: './dashboard-campaign-card.component.html',
  styleUrls: ['./dashboard-campaign-card.component.css']
})
export class DashboardCampaignCardComponent implements OnInit {

  @Input() campaignId: string;
  @Input() title: string;
  @Input() ngo: string;
  @Input() status: string;
  @Input() timeLeft: string;
  @Input() rating: string;
  @Input() products: string;
  @Input() backers: string;
  @Input() image: string;
  ratingArray:Array<number>;
  constructor() { }

  ngOnInit(): void {
    this.ratingArray =[].constructor(parseInt(this.rating));
  }

}

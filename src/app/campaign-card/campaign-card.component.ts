import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.css']
})
export class CampaignCardComponent implements OnInit {

  @Input() title: string;
  @Input() ngo: string;
  @Input() status: string;
  @Input() timeLeft: string;
  @Input() rating: string;
  @Input() products: string;
  @Input() backers: string;
  @Input() image: string;
  ratingArray:Array<number>;

  constructor() {

  }

  ngOnInit() {
    this.ratingArray =[].constructor(parseInt(this.rating));
  }

}

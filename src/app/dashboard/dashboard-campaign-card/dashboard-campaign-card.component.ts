import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../_services/data.service';

@Component({
  selector: 'app-dashboard-campaign-card',
  templateUrl: './dashboard-campaign-card.component.html',
  styleUrls: ['./dashboard-campaign-card.component.css']
})
export class DashboardCampaignCardComponent implements OnInit {

  @Input() id: string;
  @Input() title: string;
  @Input() description: string;
  @Input() creation_date: string;
  @Input() target_date: string;
  @Input() sizes: string;
  @Input() image: string;
  daysLeft:number;

  constructor(private dataService: DataService){

  }
  ngOnInit() {
    this.daysLeft = Math.floor(( Date.parse(this.target_date) - Date.parse(this.creation_date) ) / 86400000);
    console.log(this.sizes, this.creation_date)
  }
  getUrl(){
    this.dataService.getCartUrl(this.id).subscribe(res=>{
      console.log(res);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import {DataService} from '../_services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../notification/notification.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  campaignId:any
  campaign:any;
  daysleft:number;
  products:Array<any>=[]
  constructor(private dataService: DataService,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private router: Router) { }
  ngOnInit(): void {
    this.campaignId = this.route.snapshot.params['id'];
    this.getCampaign();
  }
  public  replaceSpace(key:string):string{
    key = key.replace(/ /g,"-");
    return key;
  }
  getCampaign(){
    this.dataService.getCampaignByID(this.campaignId).subscribe(res=>{
      console.log(res);
      this.showNotificaion();
      this.campaign = res.event;
      this.products = res.event_products;
      this.daysleft = Math.floor(( Date.parse(res.event.target_date) - Date.parse(res.event.creation_date) ) / 86400000);
    })
  }

  showNotificaion(){
    const status = parseInt(this.route.snapshot.queryParams['event']);
    console.log(status);
    if(status == 1)this.notificationService.success("New Campaign Added");
  }


}

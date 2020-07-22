import { Component, OnInit } from '@angular/core';
import {DataService} from '../_services/data.service';
import {ActivatedRoute} from '@angular/router';

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
              private route: ActivatedRoute,) { }
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
      this.campaign = res.event;
      this.products = res.event_products;
      this.daysleft = Math.floor(( Date.parse(res.event.target_date) - Date.parse(res.event.creation_date) ) / 86400000);
    })
  }


}

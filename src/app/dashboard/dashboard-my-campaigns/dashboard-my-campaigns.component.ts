import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../_services/data.service';

@Component({
  selector: 'app-dashboard-my-campaigns',
  templateUrl: './dashboard-my-campaigns.component.html',
  styleUrls: ['./dashboard-my-campaigns.component.css']
})
export class DashboardMyCampaignsComponent implements OnInit {

  public campaigns:any = [];
  constructor(private dataService: DataService,) { }

  ngOnInit(): void {
    this.getCampaigns()
  }
  public getCampaigns():void {
    this.dataService.getAllCampaigns().subscribe(res=>{
      console.log(res);
      this.updateCampaigns(res);
    });
  }
  updateCampaigns(cam){
    this.campaigns = cam;
  }

}

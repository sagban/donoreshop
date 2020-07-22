import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  ratingArray:Array<number> = [];
  constructor() { }

  ngOnInit(): void {
    this.ratingArray =[].constructor(parseInt("2"));
  }
  public  replaceSpace(key:string):string{
    key = key.replace(/ /g,"-");
    return key;
  }

}

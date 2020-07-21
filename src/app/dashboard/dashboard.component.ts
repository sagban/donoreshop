import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public menuListShown:Boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  public toogleMenuList():void {
    if(window.innerWidth <=600){
      this.menuListShown = !this.menuListShown;
    }
  }

}

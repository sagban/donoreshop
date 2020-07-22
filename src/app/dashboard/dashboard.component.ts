import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public menuListShown:Boolean = true;
  constructor(private authenticationService: AuthenticationService, private router: Router,) { }

  ngOnInit(): void {
  }
  public toogleMenuList():void {
    if(window.innerWidth <=600){
      this.menuListShown = !this.menuListShown;
    }
  }
  signOut(){
    this.authenticationService.signOut().then(()=>{
      this.router.navigate(['start_campaign']);
    });
  }

}

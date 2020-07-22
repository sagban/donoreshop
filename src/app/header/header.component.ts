import { Component, OnInit } from '@angular/core';
import {CartService} from '../_services/cart.service';
import {AuthenticationService} from '../_services/authentication.service';
import Auth from '@aws-amplify/auth';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  session:boolean=false;
  public cartListLength: number;
  constructor(private authenticationService: AuthenticationService, public cartService: CartService) {
    Auth.currentAuthenticatedUser().then(()=>{
      this.changeSession(true);
    }).catch(()=>{
      this.changeSession(false);
    });
    this.cartService.getCartEmitter.subscribe(res=>{
      if(res){
        this.cartListLength = res.totalQty;
      }
      else this.cartListLength = 0;
    });
  }

  ngOnInit() {
  }

  changeSession(value){
    this.session = value || false;
  }

}

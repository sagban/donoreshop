import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Route} from '@angular/router';
import {CartService} from '../_services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  amount: string;
  cartQty:any;
  cartPrice:any;
  campaignId:any;
  tax:number = 0;
  totalPrice: number

  constructor(public cartService: CartService,
              private route: ActivatedRoute) {
    this.cartService.getCartEmitter.subscribe(res=>{
      if(res){
        this.cartPrice = res.totalPrice;
        this.cartQty = res.totalQty;
        this.campaignId = res.campaignId;
        this.totalPrice  = this.tax + parseFloat(this.cartPrice);
      }
    });
  }

  ngOnInit(): void {
    this.amount = this.route.snapshot.params['amount'];
  }

}

import { Component, OnInit } from '@angular/core';
import {CartService} from '../_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  cartList:any = [];
  cartQty:any;
  cartPrice:any;
  campaignId:any;
  tax:number = 0;
  totalPrice: number;
  constructor(public cartService: CartService) {
    this.cartService.getCartEmitter.subscribe(res=>{
      if(res){
        this.cartList = this.getCartItemsArray(res.data);
        this.cartPrice = res.totalPrice;
        this.cartQty = res.totalQty;
        this.campaignId = res.campaignId;
        this.totalPrice  = this.tax + parseFloat(this.cartPrice);
      }
    });
  }

  ngOnInit() {

  }

  public sendCart(){
    const data = {
      "donor": 7,
      "event": 1,
      "status": "INITIATED",
      "amountDonated": this.cartPrice,
      "products" :[]
    };

    for(let i in this.cartList){
      const item = this.cartList[i];
      const product = {
          "productDonated": item.id,
          "productRequired": item.id,
          "quantity": item.qty,
          "perProductPrice": item.price
      };
      data.products.push(product);
    }
    this.cartService.postCart(data).subscribe(res=>{
      console.log(res);

    });


  }

  public getCartItemsArray(data){
    let arr = [];
    for(let i in data){
      arr.push(data[i]);
    }
    return arr;
  }
  public toogleOffers(){

  }

}

import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../_services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() id: string;
  @Input() title: string;
  @Input() price: string;
  @Input() status: string;
  @Input() needed: string;
  @Input() in_stock: string;
  @Input() remaining: string;
  @Input() image: string;
  @Input() qty: string;
  @Input() campaignId: string;
  public qtyInt:number;
  _id:string;
  constructor(public cartService: CartService) { }

  ngOnInit() {
    this._id = this.id;
    this.qtyInt = parseInt(this.qty);
    console.log(this._id);
  }
  inc(){

    if(this.qtyInt <10){
      this.cartService.incQty(this._id);
      this.qtyInt +=1;
    }

  }
  dec(){
    if(this.qtyInt > 1){
      this.cartService.decQty(this._id);
      this.qtyInt -= 1;
    }
  }
  remove(){
    this.cartService.removeItems(this._id);
  }


}

import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../_services/cart.service';
import {NotificationService} from '../../notification/notification.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() id: string;
  @Input() title: string;
  @Input() price: string;
  @Input() needed: string;
  @Input() remaining: string;
  @Input() in_stock: string;
  @Input() image: string;
  @Input() campaignId: string;
  qty:number = 1;
  status:number;
  _id:string;
  public buttonTxt: string = "Add To Cart";
  constructor(public cartService: CartService,
              private notificationservice:NotificationService) {

  }

  ngOnInit() {
    this._id = this.id;
    this.status = (parseInt(this.needed)  - parseInt(this.remaining)) / parseInt(this.needed);
  }
  public addToCart(){
    if(this.buttonTxt === 'Add To Cart'){

      const item = {
        id: this.id,
        title: this.title,
        price: parseFloat(this.price),
        image: this.image,
        in_stock: this.in_stock,
        needed: this.needed,
        status: this.status,
        remaining: this.remaining,
        qty: this.qty
      };
      this.cartService.addItem(item, this.id, this.campaignId);
      this.showSuccessNotification('Added To Cart');
      this.buttonTxt = 'Go To Cart';
    }
    else{
      window.location.href = '/cart';
    }

  }
  private showSuccessNotification(msg:string){
    this.notificationservice.success(msg);
  }

  inc(){
    if(this.qty <10){
      // this.cartService.incQty(this._id);
      this.qty +=1;
    }

  }
  dec(){
    if(this.qty > 1){
      // this.cartService.decQty(this._id);
      this.qty -=1;
    }
  }

}

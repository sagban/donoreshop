import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs/index";
@Injectable({
  providedIn: 'root'
})
export class CartService {

  public _getFilter: BehaviorSubject<any> = new BehaviorSubject<any>(localStorage.getItem('filter'));
  public getFilterEmitter: Observable<any> = this._getFilter.asObservable();

  public _getSort: BehaviorSubject<string> = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('sort')));
  public getSortEmitter: Observable<string> = this._getSort.asObservable();

  public _getCart: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('cart')));
  public getCartEmitter: Observable<any> = this._getCart.asObservable();

  private cart:any;
  private dummy: any = {
    data: {},
    totalPrice: 0,
    totalQty: 0,
    campaignId:0
  };
  base: any = environment.apiUrl;
  constructor(private http: HttpClient) {
  }


  public addItem(item:any, id: string, campaignId:string){
    const cart = this.getCart();
    let storedItem = cart.data[id];
    if(!storedItem){
      storedItem = cart.data[id] = item;
      cart.totalQty += item.qty;
      cart.totalPrice += item.qty * parseFloat(storedItem.price);
      cart.campaignId = campaignId;
      this.updateCart(cart);
    }


  }

  public decQty(id: string){
    const cart = this.getCart();
    const storedItem = cart.data[id];
    if(storedItem){
      cart.data[id].qty -= 1;
      cart.totalQty -=1;
      cart.totalPrice -= cart.data[id].price;
      this.updateCart(cart);
    }
  }
  public incQty(id: string){
    const cart = this.getCart();
    const storedItem = cart.data[id];
    if(storedItem){
      cart.data[id].qty += 1;
      cart.totalQty +=1;
      cart.totalPrice += cart.data[id].price;
      this.updateCart(cart);
    }
  }
  public removeItems(id: string){
    const cart = this.getCart();
    const storedItem = cart.data[id];
    if(storedItem){
      cart.totalQty -= cart.data[id].qty;
      cart.totalPrice -= cart.data[id].qty * cart.data[id].price;
      delete cart.data[id];
      this.updateCart(cart);
    }
  }
  public getCart(){
    return this._getCart.value || this.dummy;
  }

  private updateCart(oldCart){
    localStorage.setItem('cart', JSON.stringify(oldCart));
    this._getCart.next(oldCart);
  }

  public getFilter() {
    return this._getFilter.value;
  }
  public getSort(){
    return this._getSort.value;
  }

  postCart(data):any{
    const url = this.base + '/donor/cart/';
    return this.http.post(url, data);
  }
}

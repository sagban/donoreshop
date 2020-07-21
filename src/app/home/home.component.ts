import { Component, OnInit } from '@angular/core';
import {DataService} from '../_services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products:any=[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.getProduct();
  }

  public getProduct():void {
    this.dataService.getProductFeatured().subscribe(res=>{
      this.products = res.data;
    });
  }
  public  replaceSpace(key:string):string{
    key = key.replace(/ /g,"-");
    return key;
  }
}

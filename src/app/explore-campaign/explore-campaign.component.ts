import { Component, OnInit } from '@angular/core';
import {DataService} from '../_services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../_services/cart.service';

@Component({
  selector: 'app-explore-campaign',
  templateUrl: './explore-campaign.component.html',
  styleUrls: ['./explore-campaign.component.css']
})
export class ExploreCampaignComponent implements OnInit {

  public sortListShown:boolean;
  public filterListShown:boolean = true;
  public campaigns:any = [];
  public colors: any = [];
  public categories: any = [];
  public query:any = [];
  public totalItems: any;
  public sortList:any={
    'latest': 'Latest',
    'donor_asc': 'Donor low to high',
    'donor_dsc': 'Donor high to low',
    'popular':'Popularity'
  };
  public default_sort:string = this.sortList.latest;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.sortListShown = false;

    if(window.innerWidth <=600){
      this.filterListShown = false;
    }
    this.route.queryParams.subscribe(params =>{

      const filter = this.cartService.getFilter() || '{"category":[], "color":[]}';
      const sort = this.cartService.getSort() || 'latest';
      this.getCampaigns(filter, sort);
      this.default_sort = this.sortList[sort];
    });
  }

  public toogleSortList():void {
    this.sortListShown = !this.sortListShown;
  }
  public toogleFilterList():void {
    if(window.innerWidth <=600) {
      this.filterListShown = !this.filterListShown;
    }
  }

  public getCampaigns(f, s):void {
    this.dataService.getAllCampaigns().subscribe(res=>{
      console.log(res);
    });
  }

  public updateFilter(e, type,value):void {
    let q = JSON.parse(this.cartService.getFilter()) || {category:[], color:[]};
    if(e.target.checked) q[type].push(value);
    else q[type] = q[type].filter(e => e !== value);
    q= JSON.stringify(q);
    localStorage.setItem('filter', q);
    this.cartService._getFilter.next(q);

    this.router.navigate(["."], {
      queryParams: {
        filter: q
      },
      relativeTo: this.route,
      queryParamsHandling: 'merge'
     });
  }

  public updateSort(value):void {
    if(this.default_sort !== this.sortList[value]){
      this.default_sort = this.sortList[value];
      this.toogleSortList();
      localStorage.setItem('sort', JSON.stringify(value));
      this.cartService._getSort.next(value);
      this.router.navigate(["."], {
        queryParams: {
          sort: value
        },
        relativeTo: this.route,
        queryParamsHandling: 'merge'
      });
    }
  }
  public replaceSpace(key:string):string{
    key = key.replace(/ /g,"-");
    return key;
  }

}

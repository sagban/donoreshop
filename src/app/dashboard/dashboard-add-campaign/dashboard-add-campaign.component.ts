import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../../_services/form.service';
import {DataService} from '../../_services/data.service';

@Component({
  selector: 'app-dashboard-add-campaign',
  templateUrl: './dashboard-add-campaign.component.html',
  styleUrls: ['./dashboard-add-campaign.component.css']
})
export class DashboardAddCampaignComponent implements OnInit {

  public addCampaignForm: FormGroup;
  buyForm:FormGroup;
  public products:Array<any> = [];
  public results:Array<any> = [];
  public showList:boolean= false;
  public message:string;
  private debouncer;
  constructor(private fb: FormBuilder,
              private formService: FormService,
              private dataService: DataService) { }

  ngOnInit() {
    this.addCampaignForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z][a-zA-Z -]+$')]],
      description: ["", [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z][a-zA-Z -]+.$')]],
      image: ["", [Validators.required]],
      size: ["", [Validators.required]],
      target_date: ["", [Validators.required, Validators.pattern('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$')]],
    });
    this.buyForm = this.fb.group({
      quantity: ['', [Validators.required]]
    });
  }

  get f() { return this.addCampaignForm.controls; }

  public onSubmit(){
    let data = this.addCampaignForm.value;
    data['ngo'] = 1;
    data['products'] = this.products;
    console.log(data);
    this.message = "Campaign Saved";
    this.formService.addCampaign(data).subscribe(res=>{
      console.log(res);
    });
  }
  public searchProducts(event){
    const inputValue = event.target.value;
    clearTimeout(this.debouncer);
    this.results = [];
    this.showList = false;
    this.debouncer = setTimeout(()=>{
      this.dataService.getAWSProducts(inputValue).subscribe(res=>{
        this.showList = true;
        console.log(res);
        if(res.length > 0){
          this.results = res;
        }
      })
    }, 1500);

  }
  public addProduct(index){
    const product = this.buyForm.value;

    product['id'] = this.results[index].id;
    product['asin'] = this.results[index].asin;
    product['substitute'] = [this.results[index].id];
    product['quantity'] = product.quantity;
    console.log(product);
    this.products.push(product);
    this.showList = false;
    this.results = [];
  }

  public removeProduct(index){
    this.products.slice(index);
  }

}

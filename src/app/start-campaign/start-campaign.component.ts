import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-start-campaign',
  templateUrl: './start-campaign.component.html',
  styleUrls: ['./start-campaign.component.css']
})
export class StartCampaignComponent implements OnInit {

  public have_account:boolean;
  public forgot_password:boolean;
  public have_account_text:string;
  public forgot_password_text:string;

  constructor(private route: ActivatedRoute,) {

  }

  ngOnInit() {

    this.have_account = true;
    this.forgot_password = false;
    this.have_account_text = "Create an account?";
    this.forgot_password_text = "Forgot Password?";

  }

  public changeOption():void{
    if(!this.forgot_password){
      this.have_account = !this.have_account;
    if(this.have_account_text === "Already have an account?"){
      this.have_account_text = "Create an account?"
    }
    else this.have_account_text = "Already have an account?";
    }

  }
  public forgotPassword():void{
    this.forgot_password = !this.forgot_password;
    if(this.forgot_password){
      this.forgot_password_text = "Login";
      this.have_account_text = "";
    }
    else if(!this.forgot_password && this.have_account){
      this.forgot_password_text = "Forgot Password?";
      this.have_account_text = "Create an account?";
    }
    else{
      this.forgot_password_text = "Forgot Password?";
      this.have_account_text = "Already have an account?";
    }

  }
}

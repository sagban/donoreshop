import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardAddCampaignComponent } from './dashboard-add-campaign/dashboard-add-campaign.component';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    DashboardAddCampaignComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ]
})


export class DashboardModule { }

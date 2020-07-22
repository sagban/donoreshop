import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardAddCampaignComponent } from './dashboard-add-campaign/dashboard-add-campaign.component';
import { DashboardMyCampaignsComponent } from './dashboard-my-campaigns/dashboard-my-campaigns.component';
import { DashboardReportsComponent } from './dashboard-reports/dashboard-reports.component';
import { DashboardCampaignCardComponent } from './dashboard-campaign-card/dashboard-campaign-card.component';
import { DashboardEditCampaignComponent } from './dashboard-edit-campaign/dashboard-edit-campaign.component';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    DashboardAddCampaignComponent,
    DashboardMyCampaignsComponent,
    DashboardReportsComponent,
    DashboardCampaignCardComponent,
    DashboardEditCampaignComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ]
})


export class DashboardModule { }

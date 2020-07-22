import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";
import {DashboardComponent} from './dashboard.component';
import {AuthGuard} from '../_guard/auth.guard';
import {DashboardAddCampaignComponent} from './dashboard-add-campaign/dashboard-add-campaign.component';
import {DashboardMyCampaignsComponent} from './dashboard-my-campaigns/dashboard-my-campaigns.component';
import {DashboardReportsComponent} from './dashboard-reports/dashboard-reports.component';
import {DashboardEditCampaignComponent} from './dashboard-edit-campaign/dashboard-edit-campaign.component';

const routes: Routes = [
  {
    path : "dashboard",
    component: DashboardComponent,
    children: [
      { path: "", component: DashboardHomeComponent, canActivate:[AuthGuard]},
      { path: "add_campaign", component: DashboardAddCampaignComponent, canActivate:[AuthGuard]},
      { path: "my_campaigns", component: DashboardMyCampaignsComponent, canActivate:[AuthGuard]},
      { path: "my_campaigns/:campaignId/edit", component: DashboardEditCampaignComponent, canActivate:[AuthGuard]},
      { path: "my_campaigns/:campaignId/report", component: DashboardReportsComponent, canActivate:[AuthGuard]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

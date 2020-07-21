import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";
import {DashboardComponent} from './dashboard.component';
import {AuthGuard} from '../_guard/auth.guard';

const routes: Routes = [
  {
    path : "dashboard",
    component: DashboardComponent,
    children: [
      { path: "", component: DashboardHomeComponent, canActivate:[AuthGuard]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

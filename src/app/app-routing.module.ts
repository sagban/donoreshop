import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {StartCampaignComponent} from './start-campaign/start-campaign.component';
import {UnauthGuard} from './_guard/unauth.guard';
import {CampaignComponent} from './campaign/campaign.component';
import {ExploreCampaignComponent} from './explore-campaign/explore-campaign.component';
import {CartComponent} from './cart/cart.component';
import {CheckoutComponent} from './checkout/checkout.component';

const routes: Routes = [
  { path : '', component: HomeComponent},
  { path : 'about', component: AboutComponent},
  { path : 'start_campaign', component: StartCampaignComponent, canActivate:[UnauthGuard]},
  { path : 'explore_campaign', component: ExploreCampaignComponent},
  { path : 'campaign/:ngo/:id/details', component: CampaignComponent},
  { path: "cart", component: CartComponent},
  { path : 'checkout/:amount', component: CheckoutComponent},
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

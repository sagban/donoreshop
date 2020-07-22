import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { DashboardModule} from "./dashboard/dashboard.module";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import {AuthenticationService} from './_services/authentication.service';
import { StartCampaignComponent } from './start-campaign/start-campaign.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import {AmplifyUIAngularModule} from '@aws-amplify/ui-angular';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignCardComponent } from './campaign-card/campaign-card.component';
import { ProductComponent } from './campaign/product/product.component';
import { ReviewComponent } from './campaign/review/review.component';
import { UpdateComponent } from './campaign/update/update.component';
import { CartComponent } from './cart/cart.component';
import { ExploreCampaignComponent } from './explore-campaign/explore-campaign.component';
import {NotificationModule} from './notification/notification.module';
import {CartItemComponent} from './cart/cart-item/cart-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    SubscribeComponent,
    StartCampaignComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    ForgotPasswordComponent,
    CampaignComponent,
    CampaignCardComponent,
    ProductComponent,
    ReviewComponent,
    UpdateComponent,
    CartComponent,
    CartItemComponent,
    ExploreCampaignComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    ShareButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationModule,
    // CheckoutModule,
    DashboardModule,
    AmplifyAngularModule,
    AppRoutingModule,
  ],
  providers: [AuthenticationService, AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }

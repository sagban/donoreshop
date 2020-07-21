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
    DashboardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    ShareButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    // NotificationModule,
    // CheckoutModule,
    DashboardModule,
    AmplifyAngularModule,
    AppRoutingModule,
  ],
  providers: [AuthenticationService, AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }

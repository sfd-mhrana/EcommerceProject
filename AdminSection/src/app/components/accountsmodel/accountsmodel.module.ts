import { NgModule } from '@angular/core';
import { CommonModule ,DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { AccountsmodelRoutingModule } from './accountsmodel-routing.module';
import { AccountsheadernavComponent } from './accountsheadernav/accountsheadernav.component';
import { AccountcostComponent } from './accountcost/accountcost.component';
import { AccountinvestmentsComponent } from './accountinvestments/accountinvestments.component';
import { AccountsloanComponent } from './accountsloan/accountsloan.component';
import { SeeaccountsdetailsComponent } from './seeaccountsdetails/seeaccountsdetails.component';
import { AddaccountsamountComponent } from './addaccountsamount/addaccountsamount.component';

import {SimpleNotificationsModule} from 'angular2-notifications'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SendtobankComponent } from './sendtobank/sendtobank.component'

@NgModule({
  declarations: [
    AccountsheadernavComponent,
    AccountcostComponent,
    AccountinvestmentsComponent,
    AccountsloanComponent,
    SeeaccountsdetailsComponent,
    AddaccountsamountComponent,
    SendtobankComponent
  ],
  imports: [
    CommonModule,
    AccountsmodelRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot({
      position:["top","center"],
      timeOut: 3000, 
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
     
    }),
    BrowserAnimationsModule,
  ],
  providers: [DatePipe],
})
export class AccountsmodelModule { }
 
import { NgModule } from '@angular/core';
import { CommonModule ,DatePipe } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { BankingmoduleRoutingModule } from './bankingmodule-routing.module';
import { BankheadernavComponent } from './bankheadernav/bankheadernav.component';

import {SimpleNotificationsModule} from 'angular2-notifications'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NewbankComponent } from './newbank/newbank.component';
import { BankdetailsComponent } from './bankdetails/bankdetails.component';
import { MainbankpageComponent } from './mainbankpage/mainbankpage.component';
import { SendtocashComponent } from './sendtocash/sendtocash.component';
import { SeebankallaccountComponent } from './seebankallaccount/seebankallaccount.component'
@NgModule({
  declarations: [
    BankheadernavComponent,
    NewbankComponent,
    BankdetailsComponent,
    MainbankpageComponent,
    SendtocashComponent,
    SeebankallaccountComponent
  ],
  imports: [
    CommonModule,
    BankingmoduleRoutingModule,
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
export class BankingmoduleModule { }

import { NgModule } from '@angular/core';
import { CommonModule ,DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { SalesmodelRoutingModule } from './salesmodel-routing.module';
import { NewsalesComponent } from './newsales/newsales.component';
import { SalesaccountComponent } from './salesaccount/salesaccount.component';
import { SalesbybillComponent } from './salesbybill/salesbybill.component';
import { SalesbydateComponent } from './salesbydate/salesbydate.component';
import { SalesbycustommerComponent } from './salesbycustommer/salesbycustommer.component';
import { SalesduepaidComponent } from './salesduepaid/salesduepaid.component';
import { SalesheadernavComponent } from './salesheadernav/salesheadernav.component';
import { SalesproductComponent } from './salesproduct/salesproduct.component';
import { SubmitsalesinvoiceComponent } from './submitsalesinvoice/submitsalesinvoice.component';

import {SimpleNotificationsModule} from 'angular2-notifications'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    NewsalesComponent,
    SalesaccountComponent,
    SalesbybillComponent,
    SalesbydateComponent,
    SalesbycustommerComponent,
    SalesduepaidComponent,
    SalesheadernavComponent,
    SalesproductComponent,
    SubmitsalesinvoiceComponent
  ],
  imports: [
    CommonModule,
    SalesmodelRoutingModule,
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
export class SalesmodelModule { }

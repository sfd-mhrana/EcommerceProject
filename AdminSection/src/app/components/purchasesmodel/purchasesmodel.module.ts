import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { PurchasesmodelRoutingModule } from './purchasesmodel-routing.module';
import { PurchasesheadernavComponent } from './purchasesheadernav/purchasesheadernav.component';
import { NewpurchasesComponent } from './newpurchases/newpurchases.component';
import { PurchasesduepaidComponent } from './purchasesduepaid/purchasesduepaid.component';
import { PurchasesaccountComponent } from './purchasesaccount/purchasesaccount.component';
import { PurchasesproductComponent } from './purchasesproduct/purchasesproduct.component';
import { PurchasesbysuppliyerComponent } from './purchasesbysuppliyer/purchasesbysuppliyer.component';
import { PurchasesbybillnoComponent } from './purchasesbybillno/purchasesbybillno.component';
import { PurchasesbydateComponent } from './purchasesbydate/purchasesbydate.component';
import { SubmitinvoiceComponent } from './submitinvoice/submitinvoice.component';

import {SimpleNotificationsModule} from 'angular2-notifications'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
  
@NgModule({
  declarations: [
    PurchasesheadernavComponent,
    NewpurchasesComponent,
    PurchasesduepaidComponent,
    PurchasesaccountComponent,
    PurchasesproductComponent,
    PurchasesbysuppliyerComponent,
    PurchasesbybillnoComponent,
    PurchasesbydateComponent,
    SubmitinvoiceComponent
  ],
  imports: [
    CommonModule,
    PurchasesmodelRoutingModule,
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
export class PurchasesmodelModule { }

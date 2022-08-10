import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";


import { CustommermodelRoutingModule } from './custommermodel-routing.module';
import { NewcustommerComponent } from './newcustommer/newcustommer.component';
import { CustommerheadernavComponent } from './custommerheadernav/custommerheadernav.component';
import { CustommerreportComponent } from './custommerreport/custommerreport.component';

import {SimpleNotificationsModule} from 'angular2-notifications'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PaymentsreportComponent } from './paymentsreport/paymentsreport.component'

@NgModule({
  declarations: [
    NewcustommerComponent,
    CustommerheadernavComponent,
    CustommerreportComponent,
    PaymentsreportComponent
  ],
  imports: [
    CommonModule,
    CustommermodelRoutingModule,
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
  ]
})
export class CustommermodelModule { }

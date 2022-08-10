import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";


import { SuppliyermodelRoutingModule } from './suppliyermodel-routing.module';
import { NewSuppliyerComponent } from './new-suppliyer/new-suppliyer.component';
import { SuppliyerheadernavComponent } from './suppliyerheadernav/suppliyerheadernav.component';
import { SuppliyerreportComponent } from './suppliyerreport/suppliyerreport.component';

import {SimpleNotificationsModule} from 'angular2-notifications'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PaymentsreportComponent } from './paymentsreport/paymentsreport.component'

@NgModule({
  declarations: [
    NewSuppliyerComponent,
    SuppliyerheadernavComponent,
    SuppliyerreportComponent,
    PaymentsreportComponent
  ],
  imports: [
    CommonModule,
    SuppliyermodelRoutingModule,
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
export class SuppliyermodelModule { }

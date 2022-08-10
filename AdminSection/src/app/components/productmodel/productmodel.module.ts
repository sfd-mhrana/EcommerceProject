import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { ProductmodelRoutingModule } from './productmodel-routing.module';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductheadernavComponent } from './productheadernav/productheadernav.component';
import {SimpleNotificationsModule} from 'angular2-notifications'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { SalesReturnComponent } from './sales-return/sales-return.component';
import { PurchasesreturnComponent } from './purchasesreturn/purchasesreturn.component';

@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent,
    ProductheadernavComponent,
    SalesReturnComponent,
    PurchasesreturnComponent,
  ],
  imports: [
    CommonModule,
    ProductmodelRoutingModule,
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
    SnotifyModule
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ]
})
export class ProductmodelModule { }

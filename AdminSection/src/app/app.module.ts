import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { HeadersectionComponent } from './components/headersection/headersection.component';
import { SuppliyermodelModule } from './components/suppliyermodel/suppliyermodel.module';
import { CustommermodelModule } from './components/custommermodel/custommermodel.module';
import { EmployeemodelModule } from './components/employeemodel/employeemodel.module';
import { PurchasesmodelModule } from './components/purchasesmodel/purchasesmodel.module';
import { ProductmodelModule } from './components/productmodel/productmodel.module';
import { SalesmodelModule } from './components/salesmodel/salesmodel.module';
import { StockmodelModule } from './components/stockmodel/stockmodel.module';
import { AccountsmodelModule } from './components/accountsmodel/accountsmodel.module';
import { BankingmoduleModule } from './components/bankingmodule/bankingmodule.module';
import { DeshboardmodelModule } from './components/deshboardmodel/deshboardmodel.module';


import {SimpleNotificationsModule} from 'angular2-notifications'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LogincomponentsComponent } from './logincomponents/logincomponents.component';
import {CookieService } from 'ngx-cookie-service';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    SidenavbarComponent,
    HeadersectionComponent,
    LogincomponentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SuppliyermodelModule,
    CustommermodelModule,
    EmployeemodelModule,
    PurchasesmodelModule,
    ProductmodelModule,
    SalesmodelModule,
    StockmodelModule,
    AccountsmodelModule,
    BankingmoduleModule,
    DeshboardmodelModule, 
    HttpClientModule,
    SimpleNotificationsModule.forRoot({
      position:["top","center"],
      timeOut: 3000, 
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

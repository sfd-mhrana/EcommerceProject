import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
  
import { EmployeemodelRoutingModule } from './employeemodel-routing.module';
import { NewemployeeComponent } from './newemployee/newemployee.component';
import { EmployeeaccComponent } from './employeeacc/employeeacc.component';
import { EmployeesalesComponent } from './employeesales/employeesales.component';
import { MonthlyreportComponent } from './monthlyreport/monthlyreport.component';
import { EmployeereportComponent } from './employeereport/employeereport.component';
import { EmployeeheadernavComponent } from './employeeheadernav/employeeheadernav.component';

import {SimpleNotificationsModule} from 'angular2-notifications'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

@NgModule({
  declarations: [ 
    NewemployeeComponent,
    EmployeeaccComponent,
    EmployeesalesComponent,
    MonthlyreportComponent,
    EmployeereportComponent,
    EmployeeheadernavComponent
  ],
  imports: [
    CommonModule,
    EmployeemodelRoutingModule,
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
export class EmployeemodelModule { }

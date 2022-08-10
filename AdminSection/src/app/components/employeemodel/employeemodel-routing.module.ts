import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeaccComponent } from './employeeacc/employeeacc.component';
import { EmployeeheadernavComponent } from './employeeheadernav/employeeheadernav.component';
import { EmployeereportComponent } from './employeereport/employeereport.component';
import { EmployeesalesComponent } from './employeesales/employeesales.component';
import { MonthlyreportComponent } from './monthlyreport/monthlyreport.component';
import { NewemployeeComponent } from './newemployee/newemployee.component';

const routes: Routes = [
  {
    path: 'employee',
    component:EmployeeheadernavComponent,
    children: [
      {
        path: 'new',
        component: NewemployeeComponent
      },{
        path: 'employeeacc',
        component: EmployeeaccComponent
      },{
        path: 'employeesales',
        component: EmployeesalesComponent
      },{
        path: 'allreport',
        component: MonthlyreportComponent
      },{
        path: 'report',
        component: EmployeereportComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeemodelRoutingModule { }

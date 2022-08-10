import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustommerheadernavComponent } from './custommerheadernav/custommerheadernav.component';
import { CustommerreportComponent } from './custommerreport/custommerreport.component';
import { NewcustommerComponent } from './newcustommer/newcustommer.component';
import { PaymentsreportComponent } from './paymentsreport/paymentsreport.component';

const routes: Routes = [
  {
    path: 'custommer',
    component:CustommerheadernavComponent,
    children: [
      {
        path: 'new',
        component: NewcustommerComponent
      },{
        path: 'custommerReport',
        component: CustommerreportComponent
      },{
        path: 'pReport',
        component: PaymentsreportComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustommermodelRoutingModule { }

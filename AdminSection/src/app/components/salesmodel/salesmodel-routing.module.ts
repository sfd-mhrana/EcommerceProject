import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsalesComponent } from './newsales/newsales.component';
import { SalesaccountComponent } from './salesaccount/salesaccount.component';
import { SalesbybillComponent } from './salesbybill/salesbybill.component';
import { SalesbydateComponent } from './salesbydate/salesbydate.component';
import { SalesbycustommerComponent } from './salesbycustommer/salesbycustommer.component';
import { SalesduepaidComponent } from './salesduepaid/salesduepaid.component';
import { SalesheadernavComponent } from './salesheadernav/salesheadernav.component';
import { SalesproductComponent } from './salesproduct/salesproduct.component';
import { SubmitsalesinvoiceComponent } from './submitsalesinvoice/submitsalesinvoice.component';

const routes: Routes = [
  {
    path: 'sales',
    component:SalesheadernavComponent,
    children: [
      {
        path: 'new',
        component: NewsalesComponent
      },{
        path: 'sduepaid',
        component: SalesduepaidComponent
      },{
        path: 'salesacc',
        component: SalesaccountComponent
      },{
        path: 'salesproduct',
        component: SalesproductComponent
      },{
        path: 'salesbycustommer',
        component: SalesbycustommerComponent
      },{
        path: 'salesbybill',
        component: SalesbybillComponent
      },{
        path: 'salesbydate',
        component: SalesbydateComponent
      },{
        path: '',
        component: SubmitsalesinvoiceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesmodelRoutingModule { }

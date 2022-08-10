import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewpurchasesComponent } from './newpurchases/newpurchases.component';
import { PurchasesaccountComponent } from './purchasesaccount/purchasesaccount.component';
import { PurchasesbybillnoComponent } from './purchasesbybillno/purchasesbybillno.component';
import { PurchasesbydateComponent } from './purchasesbydate/purchasesbydate.component';
import { PurchasesbysuppliyerComponent } from './purchasesbysuppliyer/purchasesbysuppliyer.component';
import { PurchasesduepaidComponent } from './purchasesduepaid/purchasesduepaid.component';
import { PurchasesheadernavComponent } from './purchasesheadernav/purchasesheadernav.component';
import { PurchasesproductComponent } from './purchasesproduct/purchasesproduct.component';
import { SubmitinvoiceComponent } from './submitinvoice/submitinvoice.component';

const routes: Routes = [
  {
    path: 'purchases',
    component:PurchasesheadernavComponent,
    children: [
      {
        path: 'new',
        component: NewpurchasesComponent
      },{
        path: 'pduepaid',
        component: PurchasesduepaidComponent
      },{
        path: 'purchasesacc',
        component: PurchasesaccountComponent
      },{
        path: 'purchasesproduct',
        component: PurchasesproductComponent
      },{
        path: 'purchasesbysuppliyer',
        component: PurchasesbysuppliyerComponent
      },{
        path: 'purchasesbybill',
        component: PurchasesbybillnoComponent
      },{
        path: 'purchasesbydate',
        component: PurchasesbydateComponent
      },{
        path: '',
        component: SubmitinvoiceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesmodelRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountcostComponent } from './accountcost/accountcost.component';
import { AccountinvestmentsComponent } from './accountinvestments/accountinvestments.component';
import { AccountsheadernavComponent } from './accountsheadernav/accountsheadernav.component';
import { AccountsloanComponent } from './accountsloan/accountsloan.component';
import { AddaccountsamountComponent } from './addaccountsamount/addaccountsamount.component';
import { SeeaccountsdetailsComponent } from './seeaccountsdetails/seeaccountsdetails.component';
import { SendtobankComponent } from './sendtobank/sendtobank.component';

const routes: Routes = [
  {
    path: 'account',
    component:AccountsheadernavComponent,
    children: [
      {
        path:'accamount',
        component:AddaccountsamountComponent
      },{
        path: 'cost',
        component: AccountcostComponent
      },{
        path: 'loan',
        component: AccountsloanComponent
      },{
        path: 'invest',
        component: AccountinvestmentsComponent
      },{
        path: 'sendtobank',
        component: SendtobankComponent
      },{
        path: '',
        component: SeeaccountsdetailsComponent
      } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsmodelRoutingModule { }

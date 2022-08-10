import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankdetailsComponent } from './bankdetails/bankdetails.component';
import { BankheadernavComponent } from './bankheadernav/bankheadernav.component';
import { MainbankpageComponent } from './mainbankpage/mainbankpage.component';
import { NewbankComponent } from './newbank/newbank.component';
import { SeebankallaccountComponent } from './seebankallaccount/seebankallaccount.component';
import { SendtocashComponent } from './sendtocash/sendtocash.component';


const routes: Routes = [
  {
    path: 'bank',
    component:BankheadernavComponent,
    children: [
      {
        path:'newbank',
        component:NewbankComponent
      },{
        path: 'bankdetails',
        component: BankdetailsComponent
      },{
        path: 'sendtocash',
        component: SendtocashComponent
      },{
        path: 'showacc',
        component: SeebankallaccountComponent
      },{
        path: '',
        component: MainbankpageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankingmoduleRoutingModule { }

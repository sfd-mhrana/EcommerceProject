import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSuppliyerComponent } from './new-suppliyer/new-suppliyer.component';
import { PaymentsreportComponent } from './paymentsreport/paymentsreport.component';
import { SuppliyerheadernavComponent } from './suppliyerheadernav/suppliyerheadernav.component';
import { SuppliyerreportComponent } from './suppliyerreport/suppliyerreport.component';

const routes: Routes = [
  {
    path: 'suppliyer',
    component:SuppliyerheadernavComponent, 
    children: [
      {
        path: 'new',
        component: NewSuppliyerComponent
      },{
        path: 'suppliyerReport',
        component: SuppliyerreportComponent
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
export class SuppliyermodelRoutingModule { }

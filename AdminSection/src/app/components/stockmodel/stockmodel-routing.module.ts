import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockgraplistComponent } from './stockgraplist/stockgraplist.component';
import { StockheadernavComponent } from './stockheadernav/stockheadernav.component';
import { StocklistComponent } from './stocklist/stocklist.component';

const routes: Routes = [
  {
    path: 'stock',
    component:StockheadernavComponent,
    children: [
      {
        path: 'stocklist',
        component: StocklistComponent
      },{
        path: 'stockgrap',
        component: StockgraplistComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockmodelRoutingModule { }

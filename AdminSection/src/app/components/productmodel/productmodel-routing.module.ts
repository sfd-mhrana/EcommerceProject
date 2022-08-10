import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductheadernavComponent } from './productheadernav/productheadernav.component';
import { PurchasesreturnComponent } from './purchasesreturn/purchasesreturn.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';

const routes: Routes = [
  {
    path: 'product',
    component:ProductheadernavComponent,
    children: [
      { 
        path: 'category',
        component: CategoryComponent
      },{
        path: 'newproduct',
        component: ProductComponent
      },{
        path: 'purchasesreturn',
        component: PurchasesreturnComponent
      },{
        path: 'salesreturn',
        component: SalesReturnComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductmodelRoutingModule { }

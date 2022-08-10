import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeshboardpageComponent } from './deshboardpage/deshboardpage.component';

const routes: Routes = [
  {
    path: 'deshboard',
    component:DeshboardpageComponent
  }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeshboardmodelRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { DeshboardmodelRoutingModule } from './deshboardmodel-routing.module';
import { DeshboardpageComponent } from './deshboardpage/deshboardpage.component';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from "ngx-spinner";

import {SimpleNotificationsModule} from 'angular2-notifications'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    DeshboardpageComponent
  ],
  imports: [
    CommonModule,
    DeshboardmodelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    NgxSpinnerModule,
    SimpleNotificationsModule.forRoot({
      position:["top","center"],
      timeOut: 3000, 
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
     
    }),
    BrowserAnimationsModule,
  ],
  providers: [DatePipe], 
})
export class DeshboardmodelModule { }

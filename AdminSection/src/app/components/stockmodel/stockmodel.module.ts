import { NgModule } from '@angular/core';
import { CommonModule ,DatePipe} from '@angular/common';

import { StockmodelRoutingModule } from './stockmodel-routing.module';
import { StockheadernavComponent } from './stockheadernav/stockheadernav.component';
import { StocklistComponent } from './stocklist/stocklist.component';
import { StockgraplistComponent } from './stockgraplist/stockgraplist.component';

import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from "ngx-spinner";

import { BrowserModule } from '@angular/platform-browser';
import {} from '@syncfusion/ej2-angular-charts'
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService } from '@syncfusion/ej2-angular-grids';
import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { PieSeriesService, AccumulationTooltipService, AccumulationDataLabelService } from '@syncfusion/ej2-angular-charts';
import {
    LineSeriesService, DateTimeService, DataLabelService, StackingColumnSeriesService, CategoryService,
    StepAreaSeriesService, SplineSeriesService, ScrollBarService, ChartAnnotationService, LegendService, TooltipService, StripLineService,
    SelectionService, ScatterSeriesService, ZoomService, ColumnSeriesService, AreaSeriesService, RangeAreaSeriesService
} from '@syncfusion/ej2-angular-charts';


@NgModule({
  declarations: [
    StockheadernavComponent,
    StocklistComponent,
    StockgraplistComponent
  ],
  imports: [
    CommonModule,
    StockmodelRoutingModule,
    ChartsModule,
    NgxSpinnerModule,
    BrowserModule, ChartModule, AccumulationChartModule, GridModule, DialogModule
  ],
  bootstrap: [StockgraplistComponent],
  providers: [LineSeriesService, DateTimeService, ColumnSeriesService, DataLabelService, ZoomService, StackingColumnSeriesService, CategoryService,
      StepAreaSeriesService, SplineSeriesService, ChartAnnotationService, LegendService, TooltipService, StripLineService,
      PieSeriesService, AccumulationTooltipService, ScrollBarService, AccumulationDataLabelService, SelectionService, ScatterSeriesService,
      PageService, AreaSeriesService, RangeAreaSeriesService ,DatePipe]
})
export class StockmodelModule { }

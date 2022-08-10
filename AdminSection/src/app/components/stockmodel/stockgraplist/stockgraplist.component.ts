import { Component, OnInit,ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StockService } from 'src/app/services/stock/stock.service';
import { BehaviorSubject } from 'rxjs'
import {Chart, ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ILoadedEventArgs, Series } from '@syncfusion/ej2-angular-charts';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stockgraplist',
  templateUrl: './stockgraplist.component.html',
  styleUrls: ['./stockgraplist.component.css']
})
export class StockgraplistComponent implements OnInit {

  public primaryXAxis: object | undefined;
  public chartData: object[]=[];
  public title: string='';
  public primaryYAxis: object=[];
  public marker: object=[];
     public zoomSettings: Object = {
        mode: 'X',
        enableMouseWheelZooming: true,
        enablePinchZooming: true,
        enableSelectionZooming: true,
        enableScrollbar: true
    };
    public tooltip: Object = {};
 


  username='rana'; todayDate:any; bardataArray:any=[];

  refreshactive = new BehaviorSubject<boolean>(true); fromValue: any;

  allStock:any=null; laststocklist:any; totalStockAmount:any=0;

  productimage:any = environment.imageUrl+"productImage/"

 
  constructor(  private datePipe: DatePipe,private stockser:StockService) { 
    var date = new Date();
    this.todayDate= this.datePipe.transform(date, "yyyy-MM-dd");
    this.getAllStockList(this.todayDate)
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.allStock;
    })


         

          this.primaryXAxis = {
            valueType: 'DateTime',
            labelFormat: 'yMMMd'
          };
          this.primaryYAxis = {
            title: 'Sales Amount in Taka(BD)'
          };
          this.marker = {  visible: true};
          this.title =  'Stock Balanching';
          this.tooltip = { enable: true, header: 'Total Stock Amount', format: '<b>${point.x} : ${point.y}</b>' };
  }
 
  getAllStockList(date:any){
    this.bardataArray=[];
    var formdata = new FormData();
    formdata.append('User_ID', this.username);
    formdata.append('Date',date);
    this.stockser.getALlStockAmountList(formdata).subscribe((result)=>{
      this.allStock=result;
      var sizew = Object.keys(this.allStock[0]).length;
      var keysa = Object.keys(this.allStock[0]);
      for (var i=0; i!=sizew; i++) {
        var bardataobject: any = new Object();
        bardataobject.x= keysa[i];
        bardataobject.y=this.allStock[0][keysa[i]].map((item:any)=>{return parseInt(item.StockPrice)}).reduce((pev:number,con:number)=> pev+con);
        this.bardataArray.push(bardataobject)
      }

      this.chartData =this.bardataArray;

      console.warn(this.bardataArray)
      this.laststocklist=this.allStock[0][keysa[sizew-1]];
      this. counttotal();
    })
  }

  counttotal(){
    this.totalStockAmount=this.laststocklist.map((item: any) => parseInt(item.StockPrice)).reduce((prev: any, next: any) => prev + next);;
  }







}

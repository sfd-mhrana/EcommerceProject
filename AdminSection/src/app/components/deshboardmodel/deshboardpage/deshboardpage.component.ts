import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  BehaviorSubject } from 'rxjs'
import {  FormBuilder } from "@angular/forms";
import { ChartType } from 'chart.js';
import { PublicServiceService } from 'src/app/services/public-service.service';

import { NgxSpinnerService } from "ngx-spinner";  

import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-deshboardpage',
  templateUrl: './deshboardpage.component.html',
  styleUrls: ['./deshboardpage.component.css']
})
export class DeshboardpageComponent implements OnInit {

  username = 'rana'; selectedyear:any=0;

  topCustommer: any; topSuppliyer: any; topsalesproduct: any; bardetails: any;

  groupbyyear:any;  todaydate:any; allyears:any=[]; date:any;

  refreshactive = new BehaviorSubject<boolean>(true);

  purchasesdata:any=[]; salesdata:any=[]; costdata:any=[];

  productimage: any = environment.imageUrl+"productImage/";

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public mbarChartLabels: string[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  public barChartType: ChartType = 'bar';
  public barChartLegend: boolean = true;

  public barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105,159,177,0.2)',
      borderColor: 'rgba(105,159,177,1)',
      pointBackgroundColor: 'rgba(105,159,177,1)',
      pointBorderColor: '#fafafa',
      pointHoverBackgroundColor: '#fafafa',
      pointHoverBorderColor: 'rgba(105,159,177)'
    },
    {
      backgroundColor: 'rgba(77,20,96,0.3)',
      borderColor: 'rgba(77,20,96,1)',
      pointBackgroundColor: 'rgba(77,20,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,20,96,1)'
    },
    {
      backgroundColor: 'rgba(112, 208, 246,0.3)',
      borderColor: 'rgba(112, 208, 246,1)',
      pointBackgroundColor: 'rgba(112, 208, 246,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(112, 208, 246,1)'
    }
  ];

  public barChartData: any[] = [];

  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }


  constructor(private formBuilder: FormBuilder, private publicser: PublicServiceService,private datePipe: DatePipe,
    private SpinnerService: NgxSpinnerService, private notisevice: NotificationsService,) {
    this.SpinnerService.show();
    this.date = new Date();
    this.topcustommer();
    this.topsuppliyer();
    this.getbardetails();
    this.topsaleSproduct();
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.barChartData;this.purchasesdata,this.salesdata,this.costdata;
    })
  }

  topcustommer() {
    var fromdata = new FormData();
    fromdata.append('User_ID', this.username);
    this.publicser.topCustommer(fromdata).subscribe((result) => {
      this.topCustommer = result;
    })
  }

  topsuppliyer() {
    var fromdata = new FormData();
    fromdata.append('User_ID', this.username);
    this.publicser.topsuppliyer(fromdata).subscribe((result) => {
      this.topSuppliyer = result;
    })
  }

  topsaleSproduct() {
    var fromdata = new FormData();
    fromdata.append('User_ID', this.username);
    this.publicser.topsalesproduct(fromdata).subscribe((result) => {
      this.topsalesproduct = result;
    })
  }

  getbardetails() {
    var fromdata = new FormData();
    fromdata.append('User_ID', this.username);
    this.publicser.getchatdata(fromdata).subscribe((result) => {
      this.bardetails = result;
      this.groupbyyear=this.groupArrayOfObjects(this.bardetails,'YEAR');
      this.allyears = Object.keys(this.groupbyyear);
      //console.warn(this.groupbyyear);
      this.setData(this.date);
    })
  }

  groupArrayOfObjects(list: Array<any>, key: any) {
    return list.reduce(
      (rv: any, x: any) => {
        (rv[x[key]] = rv[x[key]] || [])
          .push(x);
        return rv;
      }, {});
  };

  setData(date:any){
    this. purchasesdata=[0,0,0,0,0,0,0,0,0,0,0,0];  
    this.salesdata=[0,0,0,0,0,0,0,0,0,0,0,0];  
    this.costdata=[0,0,0,0,0,0,0,0,0,0,0,0];
    var year:any=0;
    year = this.datePipe.transform(date, "yyyy");
  
   if(this.allyears.indexOf(year)<0){
      this.notisevice.warn('Sorry!', 'No Data Found', {
        animate: 'fromTop'
      })
      this.SpinnerService.hide(); 
   }else{
    //console.warn(this.groupbyyear[year])
   this.SpinnerService.hide(); 

    this.selectedyear=year;
    this.groupbyyear[year].map((item:any)=>{
         if(item.MONTH=='January'){
            this.purchasesdata[0]=item.Purchases_Total;
            this.salesdata[0]=item.Sales_Total;
            this.costdata[0]=item.Cost_Amount;
         }else if(item.MONTH=='February'){
          this.purchasesdata[1]=item.Purchases_Total;
          this.salesdata[1]=item.Sales_Total;
          this.costdata[1]=item.Cost_Amount;
         }else if(item.MONTH=='March'){
          this.purchasesdata[2]=item.Purchases_Total;
          this.salesdata[2]=item.Sales_Total;
          this.costdata[2]=item.Cost_Amount;
         }else if(item.MONTH=='April'){
          this.purchasesdata[3]=item.Purchases_Total;
          this.salesdata[3]=item.Sales_Total;
          this.costdata[3]=item.Cost_Amount;
        }else if(item.MONTH=='May'){
          this.purchasesdata[4]=item.Purchases_Total;
          this.salesdata[4]=item.Sales_Total;
          this.costdata[4]=item.Cost_Amount;
        }else if(item.MONTH=='June'){
          this.purchasesdata[5]=item.Purchases_Total;
          this.salesdata[5]=item.Sales_Total;
          this.costdata[5]=item.Cost_Amount;
        }else if(item.MONTH=='July'){
          this.purchasesdata[6]=item.Purchases_Total;
          this.salesdata[6]=item.Sales_Total;
          this.costdata[6]=item.Cost_Amount;
        }else if(item.MONTH=='August'){
          this.purchasesdata[7]=item.Purchases_Total;
          this.salesdata[7]=item.Sales_Total;
          this.costdata[7]=item.Cost_Amount;
       }else if(item.MONTH=='September'){
        this.purchasesdata[8]=item.Purchases_Total;
        this.salesdata[8]=item.Sales_Total;
        this.costdata[8]=item.Cost_Amount;
       }else if(item.MONTH=='October'){
        this.purchasesdata[9]=item.Purchases_Total;
        this.salesdata[9]=item.Sales_Total;
        this.costdata[9]=item.Cost_Amount;
      }else if(item.MONTH=='November'){
        this.purchasesdata[10]=item.Purchases_Total;
        this.salesdata[10]=item.Sales_Total;
        this.costdata[10]=item.Cost_Amount;
      }else if(item.MONTH=='December'){
        this.purchasesdata[1]=item.Purchases_Total;
        this.salesdata[1]=item.Sales_Total;
        this.costdata[1]=item.Cost_Amount;
     }
    })
    
    this.barChartData=[
      { data: this.salesdata, label: 'Sales' },
      { data: this.purchasesdata, label: 'Purchases' },
      { data: this.costdata, label: 'Cost' }
    ]
   }
  }

}

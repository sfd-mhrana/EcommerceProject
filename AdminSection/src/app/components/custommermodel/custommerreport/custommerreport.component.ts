import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { SalesserService } from 'src/app/services/sales/salesser.service';

@Component({
  selector: 'app-custommerreport',
  templateUrl: './custommerreport.component.html',
  styleUrls: ['./custommerreport.component.css']
})
export class CustommerreportComponent implements OnInit {

  username = 'rana'; custommername: any; fromValue:any=null;

  allcustommer: any = null; allProducts: any = null; groupByinvoice: any = [];  custommerDetails:any=[];

  allInvioceDetails:any=[];
  
  tableItem:any=null;

  totalamount:any=0; totalProfit:any=0; totalIndex:any=0;

  refreshactive = new BehaviorSubject<boolean>(true);

  constructor(private salesser: SalesserService) {

    this.setAllCustommer()
    this.getAllProduct() 

  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.custommername;this.tableItem;
    })

    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }

  setName(value: any) {
    this.tableItem=[];
    this.custommerDetails=[]
    this.custommername = value.Company_Name;
    this.allInvioceDetails.map((item:any)=>{
      if(item.cumpanyname==this.custommername){
        this.custommerDetails.push(item)
      }
    })
    this.tableItem=this.custommerDetails;
    this.countTotal()
  }

  setAllCustommer() {
    var formdata = new FormData();
    formdata.append('User_ID', this.username);
    this.salesser.getAllCustommer(formdata).subscribe((result) => {
      this.allcustommer = result;
    })
  }

  getAllProduct() {
    var formdata = new FormData();
    formdata.append('User_ID', this.username);
    this.salesser.getAllProductGroupByInvoice(formdata).subscribe((result) => {
      this.allProducts = result;
     
      this.groupByinvoice = groupArrayOfObjects(this.allProducts, 'Invoice_No')
      
      var size = Object.keys(this.groupByinvoice).length;
      var key = Object.keys(this.groupByinvoice);
      for (var j = 0; j != size; j++) {
        var alltableitamdetails: any = new Object();
        alltableitamdetails.cumpanyname=this.groupByinvoice[key[j]][0].Company_Name; 
        alltableitamdetails.invoiceNO=this.groupByinvoice[key[j]][0].Invoice_No;
        alltableitamdetails.employeeName=this.groupByinvoice[key[j]][0].employee.Employee_Name;
        alltableitamdetails.Date=this.groupByinvoice[key[j]][0].Sales_Date;
        alltableitamdetails.totalItem=this.groupByinvoice[key[j]].length;
        alltableitamdetails.totalAmount= this.groupByinvoice[key[j]].map((item: any) => item.Total_Price).reduce((prev: any, next: any) => prev + next);
        alltableitamdetails.totalProfit= this.groupByinvoice[key[j]].map(
          (item: any) => 
          (item.Sales_Price-item.product_g_r_n.Producut_Price)*item.Quantaty
        ).reduce((prev: any, next: any) => prev + next);
        this.allInvioceDetails.push(alltableitamdetails)
      }
        this.tableItem=this.allInvioceDetails
        //console.warn(this.tableItem)
        this.countTotal()
    })

    function groupArrayOfObjects(list: Array<any>, key: any) {
      return list.reduce(
        (rv: any, x: any) => {
          (rv[x[key]] = rv[x[key]] || [])
            .push(x);
          return rv;
        }, {});
    }
  
  

  }

  countTotal() {
    if(this.tableItem!=null && this.tableItem.length>0){
     this.totalamount= this.tableItem.map((item: any) => item.totalAmount).reduce((prev: any, next: any) => prev + next);
     this.totalProfit=this.tableItem.map((item: any) => item.totalProfit).reduce((prev: any, next: any) => prev + next);
      this.totalIndex=this.tableItem.length;
    }
  }


  fromProduct(value: any) {
    this.tableItem = []
    this.fromValue = value;
    if (value != null) {
      console.warn(this.custommerDetails.length)
      if (this.custommerDetails.length>0) {
        this.custommerDetails.map((item: any) => {
          if (item.Date == value) {
            this.tableItem.push(item)
          }
        });
        console.warn(this.tableItem.length)
        if (this.tableItem.length == 0) {
          alert('no Data Found');
        } else {
          this.countTotal()
        }
      } else {
        alert('Select Custommer Name')
      }
    } else {
      alert('hellow')
    }
  }

  toProduct(value: any) {
    this.tableItem = []
    if (value != null) {
      this.custommerDetails.map((item: any) => {
        if (item.Date >= this.fromValue && item.Date <= value) {
          this.tableItem.push(item)
        }
      });
      if (this.tableItem.length == 0) {
        alert('no Data Found')
      } else {
        this.countTotal()
      }
    } else {
      alert('hellow')
    }
  }

}

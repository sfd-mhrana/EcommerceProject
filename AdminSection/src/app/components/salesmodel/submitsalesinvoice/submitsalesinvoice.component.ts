import { Component, OnInit } from '@angular/core';
import { SalesserService } from 'src/app/services/sales/salesser.service';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { SalesaccserService } from 'src/app/services/sales/salesaccser.service';
import { AccountsserService } from 'src/app/services/account/accountsser.service';

@Component({
  selector: 'app-submitsalesinvoice',
  templateUrl: './submitsalesinvoice.component.html',
  styleUrls: ['./submitsalesinvoice.component.css']
})
export class SubmitsalesinvoiceComponent implements OnInit {
  readonly: any = false; noData: any = false;
  username = 'rana'; fromValue:any=null; todaydate:any;

  allcustommer: any = null; allProducts: any = null; groupByinvoice: any = [];  

  allInvioceDetails:any=[];
  
  dueAmount:any=0; totalAmount:any=0; paidAmount:any=0;
  
  tableItem:any=null;

  totalamount:any=0; discount:any=0; totalIndex:any=0;

  refreshactive = new BehaviorSubject<boolean>(true);

  constructor(private salesser:SalesserService,private salesacc:SalesaccserService,
    private casher:AccountsserService, private datePipe: DatePipe,
    ) { 
      var date = new Date();
      this.todaydate = this.datePipe.transform(date, "yyyy-MM-dd");
    
    this.getAllNonSummitInvoice()
  }
 
  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.tableItem;this.allInvioceDetails;
    })
  }
 
  getAllNonSummitInvoice(){
    this.tableItem=[];
    this.groupByinvoice=null;
    this.allInvioceDetails=[];
    var formdata = new FormData();
    formdata.append('User_ID', this.username);
    this.salesser.getNonImportInvoice(formdata).subscribe((result) => {
      this.allProducts = result;
     
      this.groupByinvoice = groupArrayOfObjects(this.allProducts, 'Invoice_No')
      
      var size = Object.keys(this.groupByinvoice).length;
      var key = Object.keys(this.groupByinvoice);
      for (var j = 0; j != size; j++) {
        var alltableitamdetails: any = new Object();
        alltableitamdetails.indexes=j;
        alltableitamdetails.cumpanyname=this.groupByinvoice[key[j]][0].Company_Name; 
        alltableitamdetails.invoiceNO=this.groupByinvoice[key[j]][0].Invoice_No;
        alltableitamdetails.employeeName=this.groupByinvoice[key[j]][0].employee.Employee_Name;
        alltableitamdetails.employeeID=this.groupByinvoice[key[j]][0].employee.Employee_ID;
        alltableitamdetails.Date=this.groupByinvoice[key[j]][0].Sales_Date;
        alltableitamdetails.totalItem=this.groupByinvoice[key[j]].length;
        alltableitamdetails.totalAmount= this.groupByinvoice[key[j]].map((item: any) => parseInt(item.Total_Price)).reduce((prev: any, next: any) => prev + next);
        alltableitamdetails.paid=0;
        alltableitamdetails.discount=0;
        alltableitamdetails.due=this.groupByinvoice[key[j]].map((item: any) => parseInt(item.Total_Price)).reduce((prev: any, next: any) => prev + next);;
        this.allInvioceDetails.push(alltableitamdetails)
      }
        this.tableItem=this.allInvioceDetails
        //console.warn(this.tableItem)

        if (this.allInvioceDetails.length < 0) {
          this.readonly = false;
        } else {
          if (this.allInvioceDetails.length == 0) {
            this.noData = true;
          } else {
            this.readonly = true;
          }
  
        }
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
      this.totalIndex=this.tableItem.length;
    }
  }

  fromProduct(value: any) {
    this.tableItem = []
    this.fromValue = value;
    if (value != null) {
      console.warn(this.allInvioceDetails.length)
      if (this.allInvioceDetails.length>0) {
        this.allInvioceDetails.map((item: any) => {
          if (item.Date == value) {
            this.tableItem.push(item)
          }
        });
        console.warn(this.tableItem.length)
        if (this.tableItem.length == 0) {
          //alert('no Data Found');
        } else {
          this.countTotal()
        }
      } else {
        //alert('Select Custommer Name')
      }
    } else {
      //alert('hellow')
    }
  }

  toProduct(value: any) {
    this.tableItem = []
    if (value != null) {
      this.allInvioceDetails.map((item: any) => {
        if (item.Date >= this.fromValue && item.Date <= value) {
          this.tableItem.push(item)
        }
      });
      if (this.tableItem.length == 0) {
       // alert('no Data Found')
      } else {
        this.countTotal()
      }
    } else {
      //alert('hellow')
    }
  }
  setDueD(value: any, allvalue: any) {
    var input = value.target.value
    this.discount = input;
    if (this.paidAmount != 0) {
      this.dueAmount = allvalue.total - this.paidAmount - input;
    } else {
      this.dueAmount = allvalue.total - input
    }
    this.allInvioceDetails[allvalue.index].dueamount = this.dueAmount;
  }

  setDueP(value: any, allvalue: any) {

    var input = value.target.value
    this.paidAmount = input;
    if (this.discount != 0) {
      this.dueAmount = allvalue.total - this.discount - input;
    } else {
      this.dueAmount = allvalue.total - input
    }
    this.allInvioceDetails[allvalue.index].dueamount = this.dueAmount;
  }

  submitinvoice(value:any){
    const formdata = new FormData();
    formdata.append('User_ID', this.username);
    formdata.append('Company_Name', value.cumpanyname);
    formdata.append('Invoice_No', value.invoiceNO);
    formdata.append('Sales_Date', value.Date);
    formdata.append('Total_Item', value.totalItem);
    formdata.append('Total_Amount', value.totalAmount);
    formdata.append('Discount', this.discount);
    formdata.append('Paid', this.paidAmount);
    formdata.append('SR_ID', value.employeeID);
    formdata.append('Status', 'Cash');
    this.salesacc.createsalesAcc(formdata).subscribe((resul) => {
      if (this.paidAmount != 0) {
        const purchasescash = new FormData();
        purchasescash.append('User_ID', this.username);
        purchasescash.append('Date', this.todaydate);
        purchasescash.append('Amount', this.paidAmount);
        purchasescash.append('Status', 'Credit');
        purchasescash.append('Details', value.cumpanyname + '/' +value.invoiceNO + "/Sales");
        this.casher.addCash(purchasescash).subscribe((result) => {
          this.getAllNonSummitInvoice()
        })
      } 
      this.getAllNonSummitInvoice()
    })
  }

  goToEditData(value: any) {      
    var BillDetailsArray =  value .invoiceNO
    this.salesser.salesInvoiceNo = BillDetailsArray;
  }
}

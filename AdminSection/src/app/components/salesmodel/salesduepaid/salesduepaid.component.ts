import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { SalesaccserService } from 'src/app/services/sales/salesaccser.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AccountsserService } from 'src/app/services/account/accountsser.service';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-salesduepaid',
  templateUrl: './salesduepaid.component.html',
  styleUrls: ['./salesduepaid.component.css']
})
export class SalesduepaidComponent implements OnInit {
  username = 'rana'; updateD: boolean = false; blockaccount: boolean = false;

  custommername: any = ''; invoiceno: any = '';
 
  totalAmount:any=0; TotalDue:any=0;

  allInvoices: any = null; singleInvoiceAcc: any = null; allTableItem: any = null;

  dueAmoutn: any = 0; discount: any = 0; paidAmount: any = 0; lastDue: any = 0; se_ID: any;

  editpaidamount: any = 0; editDate: any; editsalesId: any; totalInvoiceDue: any = 0;

  refreshactive = new BehaviorSubject<boolean>(true);
  todaydate: any;

  constructor(private salesAcc: SalesaccserService, private formBuilder: FormBuilder, private datePipe: DatePipe,
    private cashser: AccountsserService, private salesaccser: SalesaccserService, private notisevice: NotificationsService,
  ) {
    var date = new Date();
    this.todaydate = this.datePipe.transform(date, "yyyy-MM-dd");
    this.setAllinvoice();
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.custommername; this.invoiceno; this.dueAmoutn, this.paidAmount, this.discount; this.blockaccount;
      this.totalAmount,this.TotalDue;
    })

    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }

  setInvoice(value: any) {
    console.warn(value)
    this.blockaccount = false;
    this.paidAmount = 0;
    this.dueAmoutn = 0;
    this.invoiceno = value.Invoice_No;
    this.se_ID = value.SR_ID;
    const formData = new FormData();
    formData.append('User_ID', this.username);
    formData.append('Invoice_No', this.invoiceno);
    this.salesAcc.getSingleInvoiceacc(formData).subscribe((result) => {
      this.singleInvoiceAcc = result;
      this.allTableItem = this.singleInvoiceAcc;
      this.counttotal()
     // console.warn(this.allTableItem)
    })


    this.allInvoices.map((item: any) => {
      if (item.Invoice_No == this.invoiceno) {
        this.dueAmoutn = item.Total_Amount - item.Discount - item.Paid;
        this.totalInvoiceDue = this.dueAmoutn;
        this.custommername = item.Company_Name;
      }
    })

    if (this.dueAmoutn == 0) {
      this.blockaccount = true;
    }
    
  }

  setAllinvoice() {
    const formData = new FormData();
    formData.append('User_ID', this.username);
    this.salesAcc.getAllInvoiceacc(formData).subscribe((result) => {
      this.allInvoices = result;
      this.allTableItem = this.allInvoices;
        this.counttotal()
    })
  
  }

  setLastDue(event: any) {
    var input = event.target.value;
    this.discount = input;
    if (input != '') {
      if (this.paidAmount != 0) {
        this.lastDue = this.dueAmoutn - this.paidAmount - input;
      } else {
        this.lastDue = this.dueAmoutn - input;
      }
    }

  }

  setLastDuep(event: any) {
    var input = event.target.value;
    this.paidAmount = input;
    if (input != '') {
      if (this.discount != 0) {
        this.lastDue = this.dueAmoutn - this.discount - input;
      } else {
        this.lastDue = this.dueAmoutn - input;
      }
    }

  }

  submit() {
    if (this.validFrom()) {
      if (this.dueAmoutn == 0) {
        alert("No Due Found")
      } else {
        const formdata = new FormData();
        formdata.append('User_ID', this.username);
        formdata.append('Company_Name', this.custommername);
        formdata.append('Invoice_No', this.invoiceno);
        formdata.append('Sales_Date', this.todaydate);
        formdata.append('Total_Item', '0');
        formdata.append('Total_Amount', '0');
        formdata.append('Discount', this.discount);
        formdata.append('Paid', this.paidAmount);
        formdata.append('SR_ID', this.se_ID);
        formdata.append('Status', 'Cash');
        this.salesaccser.createsalesAcc(formdata).subscribe((resul) => {
          if (this.paidAmount != 0) {
            const purchasescash = new FormData();
            purchasescash.append('User_ID', this.username);
            purchasescash.append('Date', this.todaydate);
            purchasescash.append('Amount', this.paidAmount);
            purchasescash.append('Status', 'Credit');
            purchasescash.append('Details', this.custommername + '/' + this.invoiceno + "/Sales");
            this.cashser.addCash(purchasescash).subscribe((result) => {
              this.clear();
            })
          }
          this.clear()
        })
      }
    } else {

    }


  }
  validFrom() {

    if (this.invoiceno != '') {
      return true;
    } else {
      this.notisevice.warn('Wrong', 'Please Select Invoice No', {
        animate: 'fromTop'
      })
      return false;
    }
  }
  clear() {
    this.dueAmoutn = 0;
    this.paidAmount = 0;
    this.discount = 0;
    this.lastDue = 0;
    this.invoiceno = '';
    this.updateD = false;
    this.allInvoices = null;
    this.singleInvoiceAcc = null;
    this.setAllinvoice();
  }

  setUpdate(value: any) {
    this.blockaccount = false;
    this.dueAmoutn = this.totalInvoiceDue + value.Paid;
    this.editpaidamount = value.Paid;
    this.invoiceno = value.Invoice_No;
    this.editsalesId = value.id;
    this.editDate = value.Sales_Date;
    this.discount = value.Discount;
    this.paidAmount = value.Paid;
    this.updateD = true;
    console.warn(this.dueAmoutn)
  }

  updateSalesPaid() {

    const formdata = new FormData();
    formdata.append('id', this.editsalesId);
    formdata.append('User_ID', this.username);
    formdata.append('Company_Name', this.custommername);
    formdata.append('Invoice_No', this.invoiceno);
    formdata.append('Sales_Date', this.editDate);
    formdata.append('Discount', this.discount);
    formdata.append('Paid', this.paidAmount);

    if (this.editpaidamount > this.paidAmount) {
      this.editpaidamount = this.editpaidamount - this.paidAmount;
      formdata.append('Status', 'Devit');
    } else if (this.editpaidamount < this.paidAmount) {
      this.editpaidamount = this.paidAmount - this.editpaidamount;
      formdata.append('Status', 'Credit');
    }
    formdata.append('Date', this.todaydate);
    formdata.append('Amount', this.editpaidamount);
    this.salesAcc.updateInvoiceItem(formdata).subscribe((result) => {
      this.clear()
    })
  }
 
  delete(value: any) {
    const formdata = new FormData();
    formdata.append('User_ID', this.username);
    formdata.append('Company_Name', this.custommername);
    formdata.append('Invoice_No', value.Invoice_No);
    formdata.append('Date', this.todaydate);
    formdata.append('Amount', value.Paid);
    formdata.append('Status', 'Devit');
    formdata.append('Sales_Date', value.Sales_Date);
    formdata.append('id', value.id);
    this.salesAcc.deleteInvoiceAccItem(formdata).subscribe((result) => {
      this.clear()
    })
  }
  counttotal(){

    this.totalAmount=this.allTableItem.map((item:any)=>{return parseInt(item.Total_Amount)}).reduce((pev:number,nex:number)=>pev+nex);
    var discount=this.allTableItem.map((item:any)=>{return parseInt(item.Discount)}).reduce((pev:number,nex:number)=>pev+nex);
    var paid=this.allTableItem.map((item:any)=>{return parseInt(item.Paid)}).reduce((pev:number,nex:number)=>pev+nex);
    this.TotalDue=this.totalAmount-(discount+paid)
  }
}

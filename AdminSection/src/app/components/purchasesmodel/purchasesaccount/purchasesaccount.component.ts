import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {Subject,BehaviorSubject,Observable} from 'rxjs'
import { PurchasesserService } from '../../../services/purchases/purchasesser.service';
import { PurchasesaccService } from 'src/app/services/purchases/purchasesacc.service';
import { SuppliyerService } from 'src/app/services/suppliyer/suppliyer.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-purchasesaccount',
  templateUrl: './purchasesaccount.component.html',
  styleUrls: ['./purchasesaccount.component.css']
})
export class PurchasesaccountComponent implements OnInit {
 
  username: any = 'rana'; ifallPaid: boolean = false; updateD: boolean = false;

  //Design Section
  suppliyername: any = ''; invoiceno: string = ''; tableItem: any;
  refreshactive = new BehaviorSubject<boolean>(true);

  allSuppliyer: any = null; todaydate: any; allInvoiceAcc: any; 
  
  editLastDue: any = 0; editId: any = null; editdate: any = null;editPaidAmount:any=null;

  totalInvoice: number = 0; totalAmount: any = 0; totalDue: any = 0; singleinvoiceshow: boolean = false;totalPaid:any=0;totalDiscount:any=0;

  discountAmount: any = 0; paidAmount: any = 0; lastDue: any = 0; costing: any = 0; stepbysteppaid: number = 0;

  form: any;
  isReadOnly: boolean = false;
  suppliyeriamge: any = environment.imageUrl+"suppliyerImage/";

  constructor(private purchasesacc: PurchasesaccService, private productSer: PurchasesserService,private suppliyer:SuppliyerService ) { 
    this.setSetAllSuppliyer();
    this.getAllAcc();
  }
   
  ngOnInit(): void {

    this.refreshactive.subscribe(() => {
      this.suppliyername; this.invoiceno; this.allInvoiceAcc; this.allSuppliyer; this.tableItem; this.totalDue;
      this.updateD;
    })
   
    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }
  
  setInvioceItem(value: any) {
    this.suppliyername = value.Company_Name + "/" + value.Address;
    this.getAllbillBySuppliyer(this.suppliyername)
  }

  setInvoice(value: any) {
    this.invoiceno = value.Invoice_No;
    this.getTranjectionBybill(this.invoiceno);
  }

  setSetAllSuppliyer() {
    const formData = new FormData();
    formData.append('User_ID', this.username);
    this.suppliyer.getAllSuppliyer(formData).subscribe((result) => {
      this.allSuppliyer = result;
      //console.log(this.allSuppliyer)
    })
  }

  getAllbillBySuppliyer(cumpanyname: any) {
    this.totalAmount = 0;
    this.totalDue = 0;
    const formData = new FormData();
    formData.append('User_ID', this.username);
    formData.append('Company_Name', cumpanyname);
    this.purchasesacc.getAllbillByCustommer(formData).subscribe((result) => {
      this.allInvoiceAcc = result;
      this.tableItem = result;
      for (let i = 0; i != this.tableItem.length; i++) {
        this.totalAmount += parseInt(this.tableItem[i].Total_Amount);
        this.totalDue += this.tableItem[i].Total_Amount - this.tableItem[i].Paid - this.tableItem[i].Discount
        this.totalPaid+= parseInt(this.tableItem[i].Paid);
        this.totalDiscount+= parseInt(this.tableItem[i].Discount);
      }
      this.ifallPaid = false;
      this.totalInvoice = this.allInvoiceAcc.length;
     // console.warn(this.tableItem)
      this.singleinvoiceshow = false;
    })
  }
 
  getTranjectionBybill(bill: any) {
    this.totalAmount = 0;
    this.totalDue = 0;
    this.totalPaid=0;
    this.totalDiscount=0;
    const formDatai = new FormData();
    formDatai.append('User_ID', this.username);
    formDatai.append('Company_Name', this.suppliyername);
    formDatai.append('Invoice_No', bill);
    this.purchasesacc.getSingleInvoiceItem(formDatai).subscribe((result) => {
      this.tableItem = result;
      for (let i = 0; i != this.tableItem.length; i++) {
        this.totalAmount += parseInt(this.tableItem[i].Total_Amount);
        this.totalDue += this.tableItem[i].Total_Amount - this.tableItem[i].Paid - this.tableItem[i].Discount
        this.totalPaid+= parseInt(this.tableItem[i].Paid);
        this.totalDiscount+= parseInt(this.tableItem[i].Discount);
      }
      this.totalInvoice = this.tableItem.length;
      if (this.totalDue == 0) {
        this.ifallPaid = true;
      }
      this.singleinvoiceshow = true;
     // console.warn(this.tableItem)
    })
  }

  getAllAcc(){
    var fromdata=new FormData();
    this.purchasesacc.getAllPurchasesAcc(fromdata).subscribe((result) => {
      this.tableItem = result;
      console.warn(this.tableItem)
      this.totalAmount = this.tableItem.map((item:any)=>parseInt(item.Total_Amount)).reduce((pev:number,nex:number)=>pev+nex) ;
     
      this.totalPaid=   this.tableItem.map((item:any)=>parseInt(item.Paid)).reduce((pev:number,nex:number)=>pev+nex)
      this.totalDiscount=  this.tableItem.map((item:any)=>parseInt(item.Paid)).reduce((pev:number,nex:number)=>pev+nex)
      this.totalDue = this.totalAmount-(this.totalPaid+this.totalDiscount)
      
      this.ifallPaid = false;
      this.totalInvoice = this.tableItem.length;
     
      this.singleinvoiceshow = false;
    })
  }
}

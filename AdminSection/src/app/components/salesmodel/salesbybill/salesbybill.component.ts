import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {Subject,BehaviorSubject,Observable} from 'rxjs'
import { SalesaccserService } from 'src/app/services/sales/salesaccser.service';
import { SalesserService } from 'src/app/services/sales/salesser.service';

@Component({
  selector: 'app-salesbybill', 
  templateUrl: './salesbybill.component.html',
  styleUrls: ['./salesbybill.component.css']
})
export class SalesbybillComponent implements OnInit {
  username='rana';

  invoiceno:any=''; 

  allsalesInvoice:any=null;

  totalSales: any = 0; totalProfit: any = 0; totalIndex: any = 0;


  allProduct:any=null;  allTableItem:any=null; allInvoiceItem:any=null;

  refreshactive=new BehaviorSubject<boolean>(true);
  constructor(private salesAcc:SalesaccserService,private salesser:SalesserService) { 
    this.setAllinvoice()
    this.setAllProduct()
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(()=>{
      this.invoiceno;
    })
   
    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }
  
  setInvoice(value:any){
    this.allTableItem=[]
    this.invoiceno=value.Invoice_No;
    this.allProduct.map((item:any)=>{
      if(item.Invoice_No==this.invoiceno){
          this.allTableItem.push(item)
      }
    })
    this.allInvoiceItem=this.allTableItem;
    this.setTotal()
  }

  setAllinvoice() {
    const formData = new FormData();
    formData.append('User_ID', this.username);
    this.salesAcc.getAllInvoiceacc(formData).subscribe((result) => {
      this.allsalesInvoice = result;
    })
  }

  setAllProduct() {
    var formdata = new FormData();
    formdata.append('User_ID', this.username);
    this.salesser.getInvoiceSalesItem(formdata).subscribe((result) => {
      this.allProduct = result;
      this.allTableItem = this.allProduct;
      this.setTotal()
    })
  }

  setTotal() {
    this.totalIndex = 0; this.totalProfit = 0; this.totalSales = 0;
    this.allTableItem.map((item: any) => {
      this.totalSales += item.Total_Price;
      this.totalProfit += ((item.Sales_Price) - (item.product_g_r_n.Producut_Price)) * item.Quantaty;
    })
    this.totalIndex += this.allTableItem.length
  }
}

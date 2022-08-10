import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {Subject,BehaviorSubject,Observable} from 'rxjs'
import { SalesaccserService } from 'src/app/services/sales/salesaccser.service';

@Component({ 
  selector: 'app-salesaccount', 
  templateUrl: './salesaccount.component.html',
  styleUrls: ['./salesaccount.component.css']
})
export class SalesaccountComponent implements OnInit {
  username='rana';
  allInvoices:any=null; allTableItem:any=null;
  
  totalAmount:any=0; discount:any=0; paid:any=0; Due:any=0;

  invoiceno:any='';

  refreshactive=new BehaviorSubject<boolean>(true);
  constructor(private salesAcc:SalesaccserService) { 
    this.setAllinvoice()

  }

  ngOnInit(): void {
    this.refreshactive.subscribe(()=>{
      this.invoiceno;this.allTableItem;this.totalAmount,this.paid,this.Due,this.discount;
    })
   
    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }
  
  setInvoice(value:any){
    if(value=='resresh'){
        this.allTableItem=this.allInvoices
        this.invoiceno=''
        this.countTotal()
    }else{
      this.allTableItem = [];
      this.invoiceno = value.Invoice_No
      this.allInvoices.map((item: any) => {
        if (item.Invoice_No == this.invoiceno) {
          this.allTableItem.push(item); 
        }
      })
      this.countTotal()
    }
  
  }


  setAllinvoice() {
    const formData = new FormData();
    formData.append('User_ID', this.username);
    this.salesAcc.getAllInvoiceacc(formData).subscribe((result) => {
      this.allInvoices = result;
      this.allTableItem = this.allInvoices;
      this.countTotal()
      //console.warn(this.allTableItem)
    })
    
  }

  countTotal(){
    this.totalAmount=this.allTableItem.map((item:any)=>{ return parseInt(item.Total_Amount) }).reduce((pev:number,nex:number)=>pev+nex)
    this.discount=this.allTableItem.map((item:any)=>{ return parseInt(item.Discount) }).reduce((pev:number,nex:number)=>pev+nex)
    this.paid=this.allTableItem.map((item:any)=>{ return parseInt(item.Paid) }).reduce((pev:number,nex:number)=>pev+nex)
    this.Due=this.totalAmount-(this.discount+this.paid)

  }

}

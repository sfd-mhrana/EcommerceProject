import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {Subject,BehaviorSubject,Observable} from 'rxjs'
import { DatePipe } from '@angular/common';
import { PurchasesserService } from '../../../services/purchases/purchasesser.service';
import { PurchasesaccService } from 'src/app/services/purchases/purchasesacc.service';
import { SuppliyerService } from 'src/app/services/suppliyer/suppliyer.service';
import { environment } from 'src/environments/environment';
 
@Component({
  selector: 'app-purchasesbybillno',
  templateUrl: './purchasesbybillno.component.html',
  styleUrls: ['./purchasesbybillno.component.css']
})
export class PurchasesbybillnoComponent implements OnInit {
 
  username: any = 'rana'; 
  //Design Section
  suppliyername: any = ''; invoiceno: string = ''; tableItem: any;
  refreshactive = new BehaviorSubject<boolean>(true);

  allSuppliyer: any = null; todaydate: any; allInvoiceAcc: any; 
  
 
  allproduct:any=null; totalItem:any=0; totalAmount:any;totalQuentaty:any;

  imgurl:any = environment.imageUrl+"productImage/"
  suppliyeriamge: any =environment.imageUrl+ "suppliyerImage/";

  constructor(private purchasesacc: PurchasesaccService,private suppliyer:SuppliyerService, private productSer: PurchasesserService, private datePipe: DatePipe,) {
    this.setSetAllSuppliyer();
    this.setAllProduct();
   }

  ngOnInit(): void {
  
    this.refreshactive.subscribe(()=>{
      this.suppliyername; this.invoiceno; this.allInvoiceAcc; this.allSuppliyer; this.tableItem;
      this.totalAmount;this.totalQuentaty; this.totalItem;
     
    })
   
    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }
  
  setAllProduct(){
    this.tableItem=[]
    const formDatai = new FormData();
    formDatai.append('User_ID', this.username);
    this.productSer.allPurProduct(formDatai).subscribe((result) => {
      this.allproduct = result;
      this.tableItem=this.allproduct;
      this.totalAmount=this.tableItem.map((item:any) => item.Total_Price).reduce((prev:any, next:any) => prev + next);
      this.totalQuentaty=this.tableItem.map((item:any) => item.Quantaty).reduce((prev:any, next:any) => prev + next);
      this.totalItem=this.tableItem.length;
      //console.warn(this.tableItem)
    })
  }

  setInvioceItem(value: any) {
    this.tableItem=[];
    this.suppliyername = value.Company_Name + "/" + value.Address;
    if(this.suppliyername!=null){
      this.allproduct.map((item:any) => {
        if(item.Company_Name==this.suppliyername){
          this.tableItem.push(item)
        }
      });
      this.totalAmount=this.tableItem.map((item:any) => item.Total_Price).reduce((prev:any, next:any) => prev + next);
      this.totalQuentaty=this.tableItem.map((item:any) => item.Quantaty).reduce((prev:any, next:any) => prev + next);
      this.totalItem=this.tableItem.length;
      //console.warn(this.tableItem)
    }
    this.getAllbillBySuppliyer(this.suppliyername)
  }

  setInvoice(value: any) {
    this.invoiceno = value.Invoice_No;
    this.tableItem=[];
    if(this.suppliyername!=null){
      this.allproduct.map((item:any) => {
        if(item.Company_Name==this.suppliyername && item.Invoice_No==this.invoiceno){
          this.tableItem.push(item)
        }
      });
      this.totalAmount=this.tableItem.map((item:any) => item.Total_Price).reduce((prev:any, next:any) => prev + next);
      this.totalQuentaty=this.tableItem.map((item:any) => item.Quantaty).reduce((prev:any, next:any) => prev + next);
      this.totalItem=this.tableItem.length;
      //console.warn(this.tableItem)
    }else{
      alert('hellow')
    }
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
    const formData = new FormData();
    formData.append('User_ID', this.username);
    formData.append('Company_Name', cumpanyname);
    this.purchasesacc.getAllbillByCustommer(formData).subscribe((result) => {
      this.allInvoiceAcc=result;
    })
  }

}

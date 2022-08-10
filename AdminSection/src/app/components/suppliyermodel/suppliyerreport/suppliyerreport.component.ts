import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {Subject,BehaviorSubject,Observable} from 'rxjs'
import { PurchasesserService } from '../../../services/purchases/purchasesser.service'
import { PurchasesaccService } from 'src/app/services/purchases/purchasesacc.service';
import { SuppliyerService } from 'src/app/services/suppliyer/suppliyer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-suppliyerreport',
  templateUrl: './suppliyerreport.component.html',
  styleUrls: ['./suppliyerreport.component.css']
})
export class SuppliyerreportComponent implements OnInit {
 
  username:any='rana';

  suppliyername:any;
  refreshactive=new BehaviorSubject<boolean>(true);

  
  //Design Section
  
  allSuppliyer: any = null; todaydate: any; allInvoiceAcc: any; tableItem: any;
  
  totalInvoice: number = 0; totalAmount: any = 0; totalDue: any = 0; singleinvoiceshow: boolean = false;totalDiscount:any=0;
  totalPaid:any=0;totalItem:any=0;

  fromValue:any;  toValue:any;

  form: any; 
  isReadOnly: boolean = false;
  suppliyeriamge: any = environment.imageUrl+"suppliyerImage/";

  constructor(private productSer: PurchasesserService,private purchasesacc:PurchasesaccService,private suppliyer:SuppliyerService) {
    this.setSetAllSuppliyer();
   }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.suppliyername;  this.allInvoiceAcc; this.allSuppliyer; this.tableItem; this.totalDue;
    })
   
    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    }); 
  }

  setName(value:any){
    this.suppliyername= value.Company_Name + "/" + value.Address;
    this.getAllbillBySuppliyer(this.suppliyername);
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
        this.totalDiscount += parseInt(this.tableItem[i].Discount);
        this.totalPaid += parseInt(this.tableItem[i].Paid);
        this.totalItem+= parseInt(this.tableItem[i].Total_Item);
        this.totalDue += this.tableItem[i].Total_Amount - this.tableItem[i].Paid - this.tableItem[i].Discount
      }
      this.totalInvoice = this.allInvoiceAcc.length;
    //  console.warn(this.tableItem)
      this.singleinvoiceshow = false;
    })
  }

  fromProduct(value: any) {
    this.tableItem = []
    this.fromValue=value;
    if (value != null) {
      this.allInvoiceAcc.map((item: any) => {
        if (item.Purchase_Date == value) {
          this.tableItem.push(item)
        }
      });
      console.warn(this.tableItem.length)
      if(this.tableItem.length==0){
          alert('no Data Found');
      }else{
        for (let i = 0; i != this.tableItem.length; i++) {
          this.totalAmount += parseInt(this.tableItem[i].Total_Amount);
          this.totalDiscount += parseInt(this.tableItem[i].Discount);
          this.totalPaid += parseInt(this.tableItem[i].Paid);
          this.totalItem+= parseInt(this.tableItem[i].Total_Item);
          this.totalDue += this.tableItem[i].Total_Amount - this.tableItem[i].Paid - this.tableItem[i].Discount
        }
        //console.warn(this.tableItem)
      }
      
    } else {
      alert('hellow')
    }
  }

  toProduct(value: any) {
    this.tableItem = []
    if (value != null) {
      this.allInvoiceAcc.map((item: any) => {
        if (item.Purchase_Date >= this.fromValue && item.Purchase_Date <= value) {
          this.tableItem.push(item)
        }
      });
      if (this.tableItem.length == 0) {
        alert('no Data Found')
      } else {
        for (let i = 0; i != this.tableItem.length; i++) {
          this.totalAmount += parseInt(this.tableItem[i].Total_Amount);
          this.totalDiscount += parseInt(this.tableItem[i].Discount);
          this.totalPaid += parseInt(this.tableItem[i].Paid);
          this.totalItem+= parseInt(this.tableItem[i].Total_Item);
          this.totalDue += this.tableItem[i].Total_Amount - this.tableItem[i].Paid - this.tableItem[i].Discount
        }
        //console.warn(this.tableItem)
      }
    } else {
      alert('hellow')
    }
  }

}

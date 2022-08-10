import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { LoandetailsserviceService } from 'src/app/services/account/loandetailsservice.service';
import { NotificationsService } from 'angular2-notifications';
import { AccountsserService } from 'src/app/services/account/accountsser.service';

@Component({
  selector: 'app-seeaccountsdetails',
  templateUrl: './seeaccountsdetails.component.html',
  styleUrls: ['./seeaccountsdetails.component.css']
})
export class SeeaccountsdetailsComponent implements OnInit {
 
  alltableItem:any=null;username:any='rana'

  gellAllAccount:any=null; fromValue:any;

  refreshactive = new BehaviorSubject<boolean>(true);

  Credit:any; Devit:any; SalesPaid:any;PurchasesPaid:any;sales:any; Purchases:any; cost:any;salesReturn:any;purchasesReturn:any;

  constructor( private notisevice: NotificationsService, private formBuilder: FormBuilder,private accountser:AccountsserService) { 
    this.setAllAccount()
  }
 
  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.gellAllAccount; this.alltableItem;
      this.Credit ;this. Devit ;this. SalesPaid ;this.PurchasesPaid ;this.sales ; this.Purchases ; this.cost 

    })
  }

  setAllAccount(){
    var fromdata=new FormData()
    fromdata.append('User_ID',this.username)
    this.accountser.getAccounting(fromdata).subscribe((result)=>{
      this.gellAllAccount=result;
      this.alltableItem=this.gellAllAccount;
      this.counttotal()
    })
  }

  counttotal(){
    this.Credit=this.alltableItem.map((item:any)=>{return parseInt(item.Credit) }).reduce((prev: number, next: number) => prev + next);
    this.Devit=this.alltableItem.map((item:any)=>{return parseInt(item.Devit)}).reduce((prev: number, next: number) => prev + next);
    this.Purchases=this.alltableItem.map((item:any)=>{return parseInt(item.Purchases_Total)}).reduce((prev: number, next: number) => prev + next);
    this.PurchasesPaid=this.alltableItem.map((item:any)=>{return parseInt(item.Purchases_Paid)}).reduce((prev: number, next: number) => prev + next);
    this.sales=this.alltableItem.map((item:any)=>{return parseInt(item.Sales_Total)}).reduce((prev: number, next: number) => prev + next);
    this.SalesPaid=this.alltableItem.map((item:any)=>{return parseInt(item.Sales_Paid)}).reduce((prev: number, next: number) => prev + next);
    this.salesReturn=this.alltableItem.map((item:any)=>{return parseInt(item.Sales_Paid_R)}).reduce((prev: number, next: number) => prev + next);
    this.cost=this.alltableItem.map((item:any)=>{return parseInt(item.Cost_Amount)}).reduce((prev: number, next: number) => prev + next);
    this.purchasesReturn=this.alltableItem.map((item:any)=>{return parseInt(item.Purchases_Paid_R)}).reduce((prev: number, next: number) => prev + next);
  }

  fromProduct(value: any) {
    this.alltableItem = []
    this.fromValue=value;
    if (value != null) {
      this.gellAllAccount.map((item: any) => {
        //console.warn(item)
        if (item.Date == value) {
          this.alltableItem.push(item)
        }
      });
      console.warn(this.alltableItem.length)
      if(this.alltableItem.length==0){
        this.notisevice.warn('Sorry!', 'No Data Found', {
          animate: 'fromTop'
        })
      }else{
        this.counttotal()
        //console.warn(this.tableItem)
      }
      
    } else {
      alert('hellow')
    }
  }

  toProduct(value: any) {
    this.alltableItem = []
    if (value != null) {
      this.gellAllAccount.map((item: any) => {
        if (item.Date >= this.fromValue && item.Date <= value) {
          this.alltableItem.push(item)
        }
      });
      if (this.alltableItem.length == 0) {
        this.notisevice.warn('Sorry!', 'No Data Found', {
          animate: 'fromTop'
        })
      } else {
       this.counttotal()
        //console.warn(this.tableItem)
      }
    } else {
      alert('hellow')
    }
  }


}

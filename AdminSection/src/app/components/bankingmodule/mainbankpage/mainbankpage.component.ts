import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { LoandetailsserviceService } from 'src/app/services/account/loandetailsservice.service';
import { NotificationsService } from 'angular2-notifications';
import { AccountsserService } from 'src/app/services/account/accountsser.service';
import { BankserviceService } from 'src/app/services/bank/bankservice.service';


@Component({
  selector: 'app-mainbankpage',
  templateUrl: './mainbankpage.component.html',
  styleUrls: ['./mainbankpage.component.css']
})
export class MainbankpageComponent implements OnInit {

  alltableItem:any=null;username:any='rana'

  totalcredit:any;totaldevit:any;

  gellAllAccount:any=null; fromValue:any;

  refreshactive = new BehaviorSubject<boolean>(true);

  Credit:any; Devit:any; SalesPaid:any;PurchasesPaid:any;sales:any; Purchases:any; cost:any;

  constructor( private notisevice: NotificationsService, private formBuilder: FormBuilder,private accountser:BankserviceService) { 
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
    this.accountser.getallbankacc(fromdata).subscribe((result)=>{
      this.gellAllAccount=result;
      this.alltableItem=this.gellAllAccount;
      this.counttotal()
    })
  }

  counttotal(){
    this.totalcredit=this.alltableItem.map((item:any)=>{return parseInt(item.Credit) }).reduce((prev: number, next: number) => prev + next);
    this.totaldevit=this.alltableItem.map((item:any)=>{return parseInt(item.Devit)}).reduce((prev: number, next: number) => prev + next);
     }

  fromProduct(value: any) {
    this.alltableItem = []
    this.fromValue=value;
    if (value != null) {
      this.gellAllAccount.map((item: any) => {
        if (item.date == value) {
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
        if (item.date >= this.fromValue && item.date <= value) {
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

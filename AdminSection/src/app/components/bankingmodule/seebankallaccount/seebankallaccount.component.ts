import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { NotificationsService } from 'angular2-notifications';
import { Subject, BehaviorSubject, Observable, from } from 'rxjs'
import { DatePipe } from '@angular/common';
import { BankdataserviceService } from 'src/app/services/bank/bankdataservice.service';
import { BankserviceService } from 'src/app/services/bank/bankservice.service';

@Component({
  selector: 'app-seebankallaccount',
  templateUrl: './seebankallaccount.component.html',
  styleUrls: ['./seebankallaccount.component.css']
})
export class SeebankallaccountComponent implements OnInit {
  username:any='rana'; allbank:any; bankname:any=null;

  fromValue:any;  selectedbankid:any;

  allbanktranjection:any;  groupbybankaccount:any; singlebanktransjection:any; 

  refreshactive = new BehaviorSubject<boolean>(true);

  alltableitem:any;

  totalCredit:any=0;totalDevit:any=0; lastAMount:any=0;

  constructor(private bankdetails:BankdataserviceService,private bank:BankserviceService, private notisevice: NotificationsService,) { 
    this.setAllbank();
    this.getAllBankTransjection()
  }
 
  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.allbank; this.alltableitem;this.bankname;this.singlebanktransjection;
    })

    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }

  setName(value:any){
    this.selectedbankid=value.id;
    this.bankname=value.bank_name+" - "+value.account_number;
    var sizew = Object.keys(this.groupbybankaccount).length;
    var keysa = Object.keys(this.groupbybankaccount);
    this.singlebanktransjection=this.groupbybankaccount[this.selectedbankid];
    this.alltableitem=this.singlebanktransjection;
    this.countTotal();
  }

  setAllbank(){
    var fromdata=new FormData();
    fromdata.append('User_ID',this.username);
    this.bank.getallbank(fromdata).subscribe((result)=>{
      this.allbank=result;
    })
  }

  countTotal(){
    this.totalCredit=  this.alltableitem.map((item:any)=>{if(item.status=='Credit'){return parseInt(item.amount) }else{ return 0}}).reduce((prev:number,next:number)=> prev+next)
    this.totalDevit=  this.alltableitem.map((item:any)=>{if(item.status=='Devit'){return parseInt(item.amount)}else{ return 0}}).reduce((prev:number,next:number)=> prev+next)
    this.lastAMount=this.totalCredit-this.totalDevit;
  }

  getAllBankTransjection(){
    var fromdata=new FormData();
    fromdata.append('User_ID',this.username);
    this.bankdetails.getallbankdata(fromdata).subscribe((result)=>{
      this.allbanktranjection=result;
      this.alltableitem=this.allbanktranjection;
      this.groupbybankaccount=this.groupArrayOfObjects(this.allbanktranjection,'bank_id')
      this.countTotal();
      console.warn(this.groupbybankaccount)
    })
  }

  groupArrayOfObjects(list: Array<any>, key: any) {
    return list.reduce(
      (rv: any, x: any) => {
        (rv[x[key]] = rv[x[key]] || [])
          .push(x);
        return rv;
      }, {});
      
  };

  fromProduct(value: any) {
    this.alltableitem = []
    this.fromValue = value;
    if (value != null) {
      
      if (this.singlebanktransjection.length>0) {
        this.singlebanktransjection.map((item: any) => {
          if (item.date == value) {
            this.alltableitem.push(item)
          }
        });
        console.warn(this.alltableitem.length)
        if (this.alltableitem.length == 0) {
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
    this.alltableitem = []
    if (value != null) {
      this.singlebanktransjection.map((item: any) => {
        if (item.date >= this.fromValue && item.date <= value) {
          this.alltableitem.push(item)
        }
      });
      if (this.alltableitem.length == 0) {
        alert('no Data Found')
      } else {
       this.countTotal()
      }
    } else {
      alert('hellow')
    }
  }

}

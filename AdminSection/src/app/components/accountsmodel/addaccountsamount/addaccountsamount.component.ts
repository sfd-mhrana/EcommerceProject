import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Subject, BehaviorSubject, Observable, from } from 'rxjs'
import { AccountsmodelModule } from '../accountsmodel.module';
import { AccountsserService } from 'src/app/services/account/accountsser.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-addaccountsamount',
  templateUrl: './addaccountsamount.component.html',
  styleUrls: ['./addaccountsamount.component.css']
})
export class AddaccountsamountComponent implements OnInit {

  allTableItem:any=null;  fromValue:any;

  username = 'rana'; form: any; todaydate: any = null;

  totalcredit:any=0;totaldedit:any=0;amount:any=0;

  allCashData: any = null;

  refreshactive = new BehaviorSubject<boolean>(true);

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private notisevice: NotificationsService,
    private cashservice: AccountsserService) {
    var date = new Date();
    this.todaydate = this.datePipe.transform(date, "yyyy-MM-dd");
    this.createForm()
    this.getAllCashData()
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.allCashData; this.allTableItem;
    })
  }

  getAllCashData() {
    this.allTableItem=null;
    var fromdata = new FormData()
    fromdata.append('User_ID', this.username);
    this.cashservice.getAllCashData(fromdata).subscribe((result) => {

      this.allCashData = result;

      this.allTableItem=this.allCashData;
      this.counttotal()
    })
  }

  counttotal(){
    this.totaldedit=this.allCashData.map((item:any)=>{if(item.Status=='Devit'){return item.Amount}else{return 0}}).reduce((prev: any, next: any) => prev + next);
    this.totalcredit=this.allCashData.map((item:any)=>{if(item.Status=='Credit'){return item.Amount}else{return 0}}).reduce((prev: any, next: any) => prev + next);
    this.amount=this.totalcredit-this.totaldedit;
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        User_ID: [this.username, Validators.required],
        Details: [null, Validators.required],
        Date: [null, Validators.required],
        Amount: [null, Validators.required],
        Status: [null, Validators.required]
      }
    )
  }

  submit() {
    if (this.valid()) {
      var formdata = new FormData()
      formdata.append('User_ID', this.username);
      formdata.append('Details', this.form.get('Details')?.value + "/Other Ammount/$%");
      formdata.append('Date', this.todaydate);
      formdata.append('Amount', this.form.get('Amount')?.value);
      formdata.append('Status', this.form.get('Status')?.value);
      this.cashservice.addCash(formdata).subscribe((result) => {
        this.notisevice.success('Success', 'Data Added', {
          animate: 'fromTop'
        })
        this.getAllCashData()
        this.form.reset();
      })
    } else {

    }

  }
  valid() {

    if (this.form.get('Details')?.value) {
      if (this.form.get('Amount')?.value) {
        if (this.form.get('Status')?.value) {
          return true;
        } else {
          this.notisevice.warn('Warning', 'Please, Enter Status', {
            animate: 'fromTop'
          })
          return false;
        }
      } else {
        this.notisevice.warn('Warning', 'Please, Enter Amount', {
          animate: 'fromTop'
        })
        return false;
      }
    } else {
      this.notisevice.warn('Warning', 'Please, Enter Details', {
        animate: 'fromTop'
      })
      return false;
    }

  }

  
  fromProduct(value: any) {
    this.allTableItem = []
    this.fromValue=value;
    if (value != null) {
      this.allCashData.map((item: any) => {
        if (item.Date == value) {
          this.allTableItem.push(item)
        }
      });
      console.warn(this.allTableItem.length)
      if(this.allTableItem.length==0){
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
    this.allTableItem = []
    if (value != null) {
      this.allCashData.map((item: any) => {
        if (item.Date >= this.fromValue && item.Date <= value) {
          this.allTableItem.push(item)
        }
      });
      if (this.allTableItem.length == 0) {
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

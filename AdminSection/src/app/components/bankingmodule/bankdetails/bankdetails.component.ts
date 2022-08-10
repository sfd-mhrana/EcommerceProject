import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { NotificationsService } from 'angular2-notifications';
import { Subject, BehaviorSubject, Observable, from } from 'rxjs'
import { DatePipe } from '@angular/common';
import { BankdataserviceService } from 'src/app/services/bank/bankdataservice.service';
import { BankserviceService } from 'src/app/services/bank/bankservice.service';

@Component({ 
  selector: 'app-bankdetails',
  templateUrl: './bankdetails.component.html',
  styleUrls: ['./bankdetails.component.css']
})
export class BankdetailsComponent implements OnInit {
  username: any = 'rana'; updateid:any;

  allbank: any; todaybankData: any; updateD: boolean = false;

  refreshactive = new BehaviorSubject<boolean>(true);

  form: any; todaydate: any; totalamount: any;

  constructor(private formBuilder: FormBuilder, private notisevice: NotificationsService, private bankser: BankserviceService,
    private thisserv: BankdataserviceService, private datePipe: DatePipe,) {
    var date = new Date();
    this.todaydate = this.datePipe.transform(date, "yyyy-MM-dd");
    this.setAllBank();
    this.createForm();
    this.getTodayAddedData();
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.allbank; this.todaybankData; this.totalamount;
    })
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        User_ID: [this.username, Validators.required],
        bank_id: [null, Validators.required],
        details: [null, Validators.required],
        amount: [null, Validators.required],
        Status: [null, Validators.required],
      }
    )
  }

  getTodayAddedData() {
    var fromdata = new FormData();
    fromdata.append('User_ID', this.username);
    fromdata.append('Date', this.todaydate);
    this.thisserv.getallbankdata(fromdata).subscribe((result: any) => {
      this.todaybankData = result;
      console.warn(this.todaybankData)
      this.totalamount = result.map((item: any) => parseInt(item.amount)).reduce((pev: any, next: any) => pev + next);
    })
  }

  setAllBank() {
    var fromdata = new FormData();
    fromdata.append('User_ID', this.username);
    this.bankser.getallbank(fromdata).subscribe((result) => {
      this.allbank = result;
    })
  }

  clearForm() {
    this.form.reset();
    this.setAllBank();
    this.getTodayAddedData();
  }

  onSubmit() {
    if (this.validfrom()) {
      var fromdata = new FormData();
      fromdata.append('User_ID', this.username);
      fromdata.append('bank_id', this.form.value['bank_id']);
      fromdata.append('details', this.form.value['details']);
      fromdata.append('amount', this.form.value['amount']);
      fromdata.append('date', this.todaydate);
      fromdata.append('status', this.form.value['Status']);
      fromdata.append('type','bankamount');
      this.thisserv.addnewbankdata(fromdata).subscribe((result: any) => {
        if (result.title == 'Wrong') {
          this.notisevice.warn(result.title, result.message, {
            animate: 'fromTop'
          })
        } else {
          this.notisevice.success(result.title, result.message, {
            animate: 'fromTop'
          })
          this.clearForm()
        }

      })
    }
  }

  validfrom() {
    if (this.form.value['bank_id']) {
      if (this.form.value['bank_id']!='none') {
        if (this.form.value['details']) {
          if (this.form.value['amount']) {
            if (this.form.value['Status']) {
              return true
            } else {
              this.notisevice.warn('Warning', "Please, Select Status", {
                animate: 'fromTop'
              })
              return false;
            }
          } else {
            this.notisevice.warn('Warning', "Please, Enter Amount", {
              animate: 'fromTop'
            })
            return false;
          }
        } else {
          this.notisevice.warn('Warning', "Please, Enter Details", {
            animate: 'fromTop'
          })
          return false;
        }
      } else {
        this.notisevice.warn('Warning', "Please, Select Bank ID", {
          animate: 'fromTop'
        })
        return false;
      }
    } else {
      this.notisevice.warn('Warning', "Please, Select Bank ID", {
        animate: 'fromTop'
      })
      return false;
    }

  }

  update() { 
    var fromdata = new FormData();
    fromdata.append('User_ID', this.username);
    fromdata.append('id', this.updateid);
    fromdata.append('bank_id', this.form.value['bank_id']);
    fromdata.append('details', this.form.value['details']);
    fromdata.append('amount', this.form.value['amount']);
    fromdata.append('date', this.todaydate);
    fromdata.append('status', this.form.value['Status']);
    this.thisserv.updatebankdata(fromdata).subscribe((result: any) => {
      if (result.title == 'Wrong') {
        this.notisevice.warn(result.title, result.message, {
          animate: 'fromTop'
        })
      } else {
        this.notisevice.success(result.title, result.message, {
          animate: 'fromTop'
        })
        this.clearForm()
      }

    })
  }

  setEditData(value: any) {
    this.updateid = value.id;
    this.updateD = true;
    this.form.reset({
      bank_id: value.bank_id,
      details: value.details,
      amount: value.amount,
      Status: value.status,
    })
  }
  
  deleteproduct(value: any) {
    var fromdata = new FormData();
    fromdata.append('User_ID', this.username);
    fromdata.append('id', value.id);
    this.thisserv.deletebankdata(fromdata).subscribe((result: any) => {
      this.notisevice.success(result.title, result.message, {
        animate: 'fromTop'
      })
      this.clearForm()
    })
  }

}

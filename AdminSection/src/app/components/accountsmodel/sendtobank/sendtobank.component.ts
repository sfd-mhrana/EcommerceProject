import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { NotificationsService } from 'angular2-notifications';
import { Subject, BehaviorSubject, Observable, from } from 'rxjs'
import { DatePipe } from '@angular/common';
import { BankdataserviceService } from 'src/app/services/bank/bankdataservice.service';
import { BankserviceService } from 'src/app/services/bank/bankservice.service';

@Component({
  selector: 'app-sendtobank',
  templateUrl: './sendtobank.component.html',
  styleUrls: ['./sendtobank.component.css']
})
export class SendtobankComponent implements OnInit {
  username: any = 'rana'; updateid:any; bankforcash:any='Bank';

  allbank: any; todaybankData: any; updateD: boolean = false;

  refreshactive = new BehaviorSubject<boolean>(true);

  form: any; todaydate: any;  alltableItem:any;
  
  totaldevit:any;totalcredit:any;lastamount: any;

  constructor(private formBuilder: FormBuilder, private notisevice: NotificationsService, private bankser: BankserviceService,
    private thisserv: BankdataserviceService, private datePipe: DatePipe,) {
    var date = new Date();
    this.todaydate = this.datePipe.transform(date, "yyyy-MM-dd");
    this.setAllBank();
    this.createForm();
    this.getShopTranjection();
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.allbank; this.todaybankData; this.lastamount;this.totalcredit,this.totaldevit;
      this.alltableItem;
    })
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        User_ID: [this.username, Validators.required],
        bank_id: [null, Validators.required],
        details: ['Cash To Bank', Validators.required],
        amount: [null, Validators.required],
        Status: ['Credit', Validators.required],
      }
    )
  }

  getShopTranjection() {
    var fromdata = new FormData();
    fromdata.append('User_ID', this.username);
    fromdata.append('type', 'Shop');
    this.thisserv.getallbankdata(fromdata).subscribe((result: any) => {
      this.todaybankData = result;
      this.alltableItem=this.todaybankData;
      this.counttotal(this.alltableItem)
    })
   
  }

  counttotal(array:Array<any>){
    this.totaldevit =array.map((item: any) => {if(item.status=='Devit') {return parseInt( item.amount)}else{ return 0}}).reduce((pev: number, next: number) => pev + next);
    this.totalcredit =array.map((item: any) => {if(item.status=='Credit') {return parseInt( item.amount)}else{ return 0}}).reduce((pev: number, next: number) => pev + next);
    this.lastamount=this.totalcredit-this.totaldevit;
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
    this.getShopTranjection();
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
      fromdata.append('bankcashname','Withdraw To Shop');
      fromdata.append('cashstatus','Devit');
      fromdata.append('type', 'Shop');
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
              return true
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
    this.form.get('bank_id').setValue(value.bank_id);
    this.form.get('amount').setValue(value.amount);
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

  fromProduct(value:any){
    this.alltableItem = []
    
    if (value != null) {
      this.todaybankData.map((item: any) => {
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
        this.counttotal(this.alltableItem)
        //console.warn(this.tableItem)
      }
      
    } else {
      alert('hellow')
    }
  }
  
}

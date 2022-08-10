import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { LoandetailsserviceService } from 'src/app/services/account/loandetailsservice.service';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-accountsloan',
  templateUrl: './accountsloan.component.html',
  styleUrls: ['./accountsloan.component.css']
})
export class AccountsloanComponent implements OnInit {
  todaydate: any = null; allTableItem: any = null;

  allloanId: any = null; durLoanAMount: any = null;

  readonly: boolean = false; SingleIdDetails: boolean = false;

  username: any = 'rana'; allLoanTranjection: any = null; loangroupbyid: any = null; allLoanIdDetails: any = [];

  allSingleLoanIdTranjection: any = null;

  form: any = null;
 
  loanpersonname: any; loanId: any = null;

  totalloanamount: any; totalpaidAmount: any; totalDueAmount: any;

  refreshactive = new BehaviorSubject<boolean>(true);

  editId: any = null; EditOldAmount: any = null; update: boolean = false; editDate: any = null;


  constructor(private loanser: LoandetailsserviceService, private formBuilder: FormBuilder,
    private datePipe: DatePipe, private notisevice: NotificationsService,

  ) {
    var date = new Date();
    this.todaydate = this.datePipe.transform(date, "yyyy-MM-dd");
    this.getAllLoanTranjection()
    this.createForm()
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.loanpersonname; this.allTableItem;
    })

    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }

  setName(value: any) {
    this.readonly = true;
    this.loanpersonname = value;
    this.allSingleLoanIdTranjection = this.loangroupbyid[value];
    this.allTableItem = this.allSingleLoanIdTranjection;
    this.form.get('Details').setValue(this.allSingleLoanIdTranjection[0].Details);

    //console.warn(this.allSingleLoanIdTranjection)

    var loan = this.allSingleLoanIdTranjection.map((item: any) => { if (item.Status == 'Credit') { return item.Amount } else { return 0 } }).reduce((prev: any, next: any) => prev + next);
    var paid = this.allSingleLoanIdTranjection.map((item: any) => { if (item.Status == 'Devit') { return item.Amount } else { return 0 } }).reduce((prev: any, next: any) => prev + next);
    this.durLoanAMount = loan - paid;
    //console.warn(this.durLoanAMount)
    this.form.get('Amount').setValue(this.durLoanAMount);
    this.SingleIdDetails = true;
  }

  newClear(value: any) {
    this.readonly = false;
    this.loanpersonname = value;
  }

  getAllLoanTranjection() {
    this.SingleIdDetails = false;
    this.allLoanTranjection = null;
    var fromdata = new FormData()
    fromdata.append('User_ID', this.username);
    this.loanser.getAllLoanTranjection(fromdata).subscribe((result) => {
      this.allLoanTranjection = result;
      //console.warn(this.allLoanTranjection);
      this.setGroupByLoanId();
    })
  }

  setGroupByLoanId() {
    this.allTableItem = null;
    this.allLoanIdDetails = [];
    this.loangroupbyid = this.groupArrayOfObjects(this.allLoanTranjection, 'LoanID');
    // console.warn(this.loangroupbyid)

    var size = Object.keys(this.loangroupbyid).length;
    var key = Object.keys(this.loangroupbyid);
    this.allloanId = key;
    for (var i = 0; i != size; i++) {
      var alltableitamdetails: any = new Object();
      alltableitamdetails.loanid = this.loangroupbyid[key[i]][0].LoanID;
      alltableitamdetails.date = this.loangroupbyid[key[i]][0].Date;
      alltableitamdetails.details = this.loangroupbyid[key[i]][0].Details;
      alltableitamdetails.paidamount =
        this.loangroupbyid[key[i]].map((item: any) => { if (item.Status == 'Credit') { return item.Amount } else { return 0 } }
        ).reduce((prev: any, next: any) => prev + next);;
      alltableitamdetails.dueAmount = this.loangroupbyid[key[i]].map((item: any) => { if (item.Status == 'Devit') { return item.Amount } else { return 0 } }).reduce((prev: any, next: any) => prev + next);;
      this.allLoanIdDetails.push(alltableitamdetails);
    }

    this.totalloanamount = this.allLoanIdDetails.map((item: any) => { return item.paidamount }
    ).reduce((prev: any, next: any) => prev + next);;
    this.totalpaidAmount = this.allLoanIdDetails.map((item: any) => { return item.dueAmount }
    ).reduce((prev: any, next: any) => prev + next);;
    this.totalDueAmount = this.totalloanamount - this.totalpaidAmount
    //console.warn(this.allLoanIdDetails)
    this.allTableItem = this.allLoanIdDetails;
    console.warn(this.allTableItem)
  }

  groupArrayOfObjects(list: Array<any>, key: any) {
    return list.reduce(
      (rv: any, x: any) => {
        (rv[x[key]] = rv[x[key]] || [])
          .push(x);
        return rv;
      }, {});
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        User_ID: [this.username, Validators.required],
        Loan_ID: [null, Validators.required],
        Details: [null, Validators.required],
        Date: [null, Validators.required],
        Amount: [null, Validators.required],
        Status: [null, Validators.required]
      }
    )
  }

  submit() {
    if (this.valid()) {
      var fromData = new FormData();
      if (this.loanpersonname == 'New Loan') {
        this.loanId = Date.now().toString(36) + Math.random().toString(36).substring(2);
        fromData.append('Status', 'Credit');
        fromData.append('User_ID', this.username);
        fromData.append('LoanID', this.loanId);
        fromData.append('Date', this.todaydate);
        fromData.append('Amount', this.form.get('Amount')?.value);
        fromData.append('Details', this.form.get('Details')?.value);

        this.loanser.newLoan(fromData).subscribe((result) => {
          this.notisevice.warn('Warning', 'New Loan Created', {
            animate: 'fromTop'
          })
          this.clear()
        })
      } else {
        this.loanId = this.loanpersonname;
        fromData.append('Status', 'Devit');
        if (this.form.get('Amount')?.value > this.durLoanAMount) {
          this.notisevice.warn('Warning', "Please, Select Less Than " + this.durLoanAMount, {
            animate: 'fromTop'
          })
        } else {
          fromData.append('User_ID', this.username);
          fromData.append('LoanID', this.loanId);
          fromData.append('Date', this.todaydate);
          fromData.append('Amount', this.form.get('Amount')?.value);
          fromData.append('Details', this.form.get('Details')?.value);

          this.loanser.newLoan(fromData).subscribe((result) => {
            this.form.reset()
            this.getAllLoanTranjection()
          })
        }
      }
    } else { }

  }

  valid() {
    if (this.loanpersonname) {
      return true;
    } else {
      this.notisevice.warn('Warning', 'Please Select Loan Type', {
        animate: 'fromTop'
      })
      return false;
    }
  }

  updatedata() {
    var fromData = new FormData();
    fromData.append('Status', 'Devit');
    fromData.append('User_ID', this.username);
    fromData.append('id', this.editId);
    fromData.append('LoanID', this.loanId);
    fromData.append('CDate', this.todaydate);
    fromData.append('Date', this.editDate);
    fromData.append('Amount', this.form.get('Amount')?.value);
    fromData.append('Details', this.form.get('Details')?.value);
    if (this.form.get('Amount')?.value > this.EditOldAmount) {
      var cashamount = this.form.get('Amount')?.value - this.EditOldAmount;
      fromData.append('CStatus', 'Devit');
      fromData.append('CAmount', '' + cashamount);
    } else if (this.form.get('Amount')?.value < this.EditOldAmount) {
      var cashamount = this.EditOldAmount - this.form.get('Amount')?.value;
      fromData.append('CStatus', 'Credit');
      fromData.append('CAmount', '' + cashamount);
    }
    this.loanser.updateLoan(fromData).subscribe((result) => {
      this.form.reset()
    })
  }

  setUpdate(value: any) {
    console.warn(value)
    this.update = true;
    this.form.get('Amount').setValue(value.Amount);
    this.form.get('Details').setValue(value.Details);
    this.editId = value.id;
    this.EditOldAmount = value.Amount;
    this.editDate = value.Date;
  }

  delete(value: any) {
    var fromData = new FormData()
    fromData.append('User_ID', value.User_ID);
    fromData.append('LoanID', value.LoanID);
    fromData.append('id', value.id);
    fromData.append('Date', this.todaydate);
    fromData.append('Amount', value.Amount);
    fromData.append('Details', value.Details);
    this.loanser.deleteInvoiceTransjection(fromData).subscribe((result) => {
      this.clear()
    })
  }

  clear() {
    this.update = false;
    this.form.reset();
    this.getAllLoanTranjection()
  }
}

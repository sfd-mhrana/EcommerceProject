import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { InvestingserService } from 'src/app/services/account/investingser.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-accountinvestments',
  templateUrl: './accountinvestments.component.html',
  styleUrls: ['./accountinvestments.component.css']
})
export class AccountinvestmentsComponent implements OnInit {
  username: any = 'rana'; form: any; allPartnerName: any = null; todayDate: any;

  readonly: any = false; totalAmount: any = 0;

  partnername: any;

  allInvestingDetails: any = null; groupbyPartnerName: any = null;

  refreshactive = new BehaviorSubject<boolean>(true);


  constructor(private thisservice: InvestingserService, private formBuilder: FormBuilder, private datePipe: DatePipe, private notisevice: NotificationsService,) {
    var date = new Date();
    this.todayDate = this.datePipe.transform(date, "yyyy-MM-dd");
    this.createForm()
    this.getAllinvestingDetails()
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.partnername; this.allInvestingDetails
    })

    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }
  setName(value: any) {
    this.readonly = true;
    this.partnername = value;
  }

  getAllinvestingDetails() {
    var formdata = new FormData();
    formdata.append('User_ID', this.username)
    this.thisservice.getAllinvestingDetails(formdata).subscribe((result) => {
      this.allInvestingDetails = result;

      this.totalAmount = this.allInvestingDetails.map((result: any) => result.Amount
      ).reduce((prev: any, next: any) => prev + next);

      this.groupbyPartnerName = this.groupArrayOfObjects(this.allInvestingDetails, 'Parson_Name')
      var key = Object.keys(this.groupbyPartnerName);
      this.allPartnerName = key;
    })
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
        Date: [null, Validators.required],
        Amount: [null, Validators.required],
        Parson_Name: [null, Validators.required]
      }
    )
  }

  submitinvest() {
    if (this.valid()) {
      var fromData = new FormData();
      fromData.append('User_ID', this.username)
      fromData.append('Date', this.todayDate)
      fromData.append('Amount', this.form.get('Amount')?.value)
      if (this.readonly) {
        fromData.append('Parson_Name', this.partnername)
      } else {
        fromData.append('Parson_Name', this.form.get('Parson_Name')?.value)
      }
      this.thisservice.createNewInvesting(fromData).subscribe((result) => {
        this.notisevice.success('Success', 'New Investments Added', {
          animate: 'fromTop'
        })
        this.getAllinvestingDetails()
        console.warn(result)
      })
    } else {
    }

  }

  valid() {
    if (this.partnername || this.form.get('Parson_Name')?.value) {
      if (this.form.get('Amount')?.value) {
        return true;
      } else {
        this.notisevice.warn('Warning', 'Please Enter Amount', {
          animate: 'fromTop'
        })
        return false;
      }
    } else {
      this.notisevice.warn('Warning', 'Please Select Or Enter Parson', {
        animate: 'fromTop'
      })
      return false;
    }
  }

  deleteInvest(value: any) {
    var fromData = new FormData();
    fromData.append('User_ID', this.username)
    fromData.append('Date', this.todayDate)
    fromData.append('Amount', value.Amount)
    fromData.append('Parson_Name', value.Parson_Name)
    fromData.append('id', value.id)
    this.thisservice.deleteInvesting(fromData).subscribe((result) => {
      this.notisevice.warn('Warning', 'Investments Deleted', {
        animate: 'fromTop'
      })
      this.getAllinvestingDetails()
    })
  }

}

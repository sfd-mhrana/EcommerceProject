import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { CostingserService } from 'src/app/services/account/costingser.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-accountcost',
  templateUrl: './accountcost.component.html',
  styleUrls: ['./accountcost.component.css']
})
export class AccountcostComponent implements OnInit {
  todaydate: any = null;   alltableItem:any; fromValue:any;
  username: any = 'rana';

  refreshactive = new BehaviorSubject<boolean>(true);

  form: any; allCostingDetails: any = null; totalCost:any;

  constructor(private thisservice: CostingserService, private formBuilder: FormBuilder, private datePipe: DatePipe, private notisevice: NotificationsService,
  ) {
    var date = new Date();
    this.todaydate = this.datePipe.transform(date, "yyyy-MM-dd");
    this.getAllCosting()
    this.createForm()
  }


  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.allCostingDetails; this.alltableItem;this.totalCost=0;
    })
  }
 
  getAllCosting() {
    var formdata = new FormData();
    formdata.append('User_ID', this.username);
    this.thisservice.getAllCosting(formdata).subscribe((result) => {
      this.allCostingDetails = result;
      this.alltableItem=this.allCostingDetails;
      this.counttotal()
    })
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

  submitCosting() {
    if (this.vlaid()) {
      var formdata = new FormData();
      formdata.append('User_ID', this.username);
      formdata.append('Details', this.form.get('Details')?.value);
      formdata.append('Date', this.todaydate);
      formdata.append('Amount', this.form.get('Amount')?.value);
      formdata.append('Status', 'ShopCost');
      this.thisservice.createCosting(formdata).subscribe((result) => {
        this.notisevice.success('Success', 'Cost Added', {
          animate: 'fromTop'
        })
      })
      this.getAllCosting()
      this.form.reset();
    } else {

    }

  }

  vlaid() {
    if (this.form.get('Details')?.value) {
      if (this.form.get('Amount')?.value) {
        return true;
      } else {
        this.notisevice.warn('Warning', 'Please, Add Amount', {
          animate: 'fromTop'
        })
        return false;
      }
    } else {
      this.notisevice.warn('Warning', 'Please, Add Details', {
        animate: 'fromTop'
      })
      return false;
    }
  }
  counttotal(){
    this.totalCost=this.allCostingDetails.map((item:any)=>{return item.Amount}).reduce((prev: any, next: any) => prev + next);
  }
  deleteCosting(value: any) {
    var formdata = new FormData();
    formdata.append('User_ID', this.username);
    formdata.append('Details', value.Details);
    formdata.append('Date', this.todaydate);
    formdata.append('Amount', value.Amount);
    formdata.append('id', value.id);
    formdata.append('Status', 'Credit');
    this.thisservice.deleteCosting(formdata).subscribe((result) => {
      this.notisevice.warn('Warning', 'Cost Deleted', {
        animate: 'fromTop'
      })
    })
    this.getAllCosting()
      this.form.reset();
  }
  fromProduct(value: any) {
    this.alltableItem = []
    this.fromValue=value;
    if (value != null) {
      this.allCostingDetails.map((item: any) => {
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
      this.allCostingDetails.map((item: any) => {
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

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { NotificationsService } from 'angular2-notifications';
import { Subject, BehaviorSubject, Observable, from } from 'rxjs'
import { BankserviceService } from 'src/app/services/bank/bankservice.service';

@Component({
  selector: 'app-newbank',
  templateUrl: './newbank.component.html',
  styleUrls: ['./newbank.component.css']
})
export class NewbankComponent implements OnInit {

  totalbank: any = 0; updateid: any;

  updateD: boolean = false; username: any = 'rana';

  refreshactive = new BehaviorSubject<boolean>(true);

  form: any; allbank: any;

  constructor(private formBuilder: FormBuilder, private notisevice: NotificationsService, private thisser: BankserviceService) {
    this.createForm();
    this.setAllBank();
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.allbank;
    })
  }

  setAllBank() {
    var fromdata = new FormData();
    fromdata.append('User_ID', this.username);
    this.thisser.getallbank(fromdata).subscribe((result) => {
      this.allbank = result;
      this.totalbank=this.allbank.length;
    })

  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        User_ID: [this.username, Validators.required],
        bank_name: [null, Validators.required],
        account_number: [null, Validators.required],
        bank_type: [null, Validators.required]
      }
    )
  }

  clearForm() {
    this.updateD = false;
    this.form.reset();
    this.setAllBank();
  }

  onSubmit() {
    if (this.validfrom()) {
      var fromdata = new FormData();
      fromdata.append('User_ID', this.username);
      fromdata.append('bank_name', this.form.value['bank_name']);
      fromdata.append('account_number', this.form.value['account_number']);
      fromdata.append('bank_type', this.form.value['bank_type']);
      this.thisser.addnewbank(fromdata).subscribe((result: any) => {
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

  update() {
    var fromdata = new FormData();
    fromdata.append('User_ID', this.username);
    fromdata.append('id', this.updateid);
    fromdata.append('bank_name', this.form.value['bank_name']);
    fromdata.append('account_number', this.form.value['account_number']);
    fromdata.append('bank_type', this.form.value['bank_type']);
    this.thisser.updatebank(fromdata).subscribe((result: any) => {
      this.notisevice.success(result.title, result.message, {
        animate: 'fromTop'
      })
      this.clearForm()
    })
  }

  setEditData(value: any) {
    this.updateid = value.id;
    this.updateD = true;
    this.form.reset({
      bank_name: value.bank_name,
      account_number: value.account_number,
      bank_type: value.bank_type,
    })
  }

  deleteproduct(value: any) {
    var fromdata = new FormData();
    fromdata.append('User_ID', this.username);
    fromdata.append('id', value.id);
    this.thisser.deletebank(fromdata).subscribe((result: any) => {
      this.notisevice.success(result.title, result.message, {
        animate: 'fromTop'
      })
      this.clearForm()
    })
  }

  validfrom() {
    if (this.form.controls['bank_name'].value) {
      if (this.form.controls['account_number'].value) {
        if (this.form.controls['bank_type'].value) {
          return true;
        } else {
          this.notisevice.warn('Wrong', 'Please, Select Bank Type', {
            animate: 'fromTop'
          })
          return false;
        }
      } else {
        this.notisevice.warn('Wrong', 'Please, Enter Account Number', {
          animate: 'fromTop'
        })
        return false;
      }
    } else {
      this.notisevice.warn('Wrong', 'Please, Enter Bank Name', {
        animate: 'fromTop'
      })
      return false;
    }

  }

}

import { Component, OnInit, } from '@angular/core';
import * as $ from 'jquery';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { EmployeeaccService } from 'src/app/services/employee/employeeacc.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employeeacc',
  templateUrl: './employeeacc.component.html',
  styleUrls: ['./employeeacc.component.css']
})
export class EmployeeaccComponent implements OnInit {
  // front end variable
  employeename: any = ''; costtype: any; selectedEmployee: any; OemployeeId: any; OType: any; TotalAmount: number = 0;
  refreshactive = new BehaviorSubject<boolean>(true);

  username: any = 'rana';

  updateD: boolean = false;
  form!: FormGroup; adddata: boolean = false; userdata: any = '';
  todaydate: any;
  formData: any = new FormData();
  allemployee: any;
  allemployeeAcc: any; allSingleEmployeeAcc: any = null;
  imgurl = environment.imageUrl+"employeeImage/"
  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private notisevice: NotificationsService,
    private employeeacc: EmployeeaccService) {
    var date = new Date();
    this.todaydate = this.datePipe.transform(date, "yyyy-MM-dd");
    this.createForm();
    this.setData();
    let formData = new FormData();
    formData.append('User_ID', this.username);
    this.employeeacc.getallEmployee(formData).subscribe((result) => {
      this.allemployee = result;
    })

  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.employeename; this.costtype; this.allemployeeAcc
    })

    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }

  setName(value: any, id: any) {
    this.employeename = value;
    this.selectedEmployee = id;
    console.warn(this.selectedEmployee)
  }

  setCost(value: any) {
    this.costtype = value;
  }

  setData() {
    this.allemployeeAcc = null;
    const formData = new FormData();
    formData.append('User_ID', this.username);
    formData.append('Date', this.todaydate);
    this.employeeacc.getallEmployeeAcc(formData).subscribe((result) => {
      this.allemployeeAcc = result;
      console.warn(this.allemployeeAcc)
      for (let i = 0; i != this.allemployeeAcc.length; i++) {
        this.TotalAmount += this.allemployeeAcc[i].Amount;
      }
    })
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        User_ID: [this.username, Validators.required],
        Employee_ID: [null, Validators.required],
        Amount: [null, Validators.required],
        Type: [null, Validators.required],
        Date: [this.todaydate, Validators.required]
      }
    )

  }

  clearForm() {
    this.updateD = false;
    this.form.reset(
      {
        User_ID: this.username,
        Employee_ID: null,
        Amount: null,
        Type: null,
      }
    )
    this.employeename = '';
    this.costtype = '';
  }

  onSubmit() {
    if (this.validFrom()) {
      const formData = new FormData();
      formData.append('User_ID', this.form.value['User_ID']);
      formData.append('Employee_ID', this.selectedEmployee);
      formData.append('Amount', this.form.value['Amount']);
      formData.append('Type', this.costtype);
      formData.append('Date', this.todaydate);
      this.employeeacc.createEmployeeACC(formData).subscribe((result: any) => {
        this.adddata = true;
        if (result.title == 'Success') {
          this.notisevice.success(result.title, result.message, {
            animate: 'fromTop'
          })
          this.clearForm()
          this.setData()
        } else {
          this.notisevice.warn(result.title, result.message, {
            animate: 'fromTop'
          })
        }
      })
    } else {

    }

  }

  update() {
    const formData = new FormData();
    formData.append('User_ID', this.form.value['User_ID']);
    formData.append('OEmployee_ID', this.OemployeeId);
    formData.append('Employee_ID', this.selectedEmployee);
    formData.append('OType', this.OType);
    formData.append('Amount', this.form.value['Amount']);
    formData.append('Type', this.costtype);
    formData.append('Date', this.form.value['Date']);
    this.employeeacc.updateEmployee(formData).subscribe((result: any) => {
      console.warn(result)
      this.notisevice.success('Success', result.message, {
        animate: 'fromTop'
      })
      return false;
    })
  }


  setEditData(p: any) {
    this.form.reset(
      {
        User_ID: this.username,
        Employee_ID: p.Employee_Name,
        Amount: p.Amount,
        Type: p.Type,
        Date: p.Date
      }
    )
    this.OemployeeId = p.Employee_ID;
    this.OType = p.Type;
    this.costtype = p.Type;
    this.selectedEmployee = p.Employee_ID;
    this.updateD = true;
    this.employeename = p.employee.Employee_Name
  }

  deleteEmployee(id: any) {
    const formData = new FormData();
    formData.append('User_ID', this.form.value['User_ID']);
    formData.append('Employee_ID', id.Employee_ID);
    formData.append('OType', id.Type);
    formData.append('Date', id.Date);
    this.employeeacc.deleteEmployee(formData).subscribe((result:any) => {
      this.notisevice.success(result.title, result.message, {
        animate: 'fromTop'
      })
      this.setData()
    })
  }

  validFrom() {

    if (this.selectedEmployee) {
      if (this.form.controls['Amount'].value) {
        if (this.costtype) {
          return true;
        } else {
          this.notisevice.warn('Wrong', 'Please Select Cost Type', {
            animate: 'fromTop'
          })
          return false;
        }
      } else {
        this.notisevice.warn('Wrong', 'Please Enter Amount', {
          animate: 'fromTop'
        })
        return false;
      }
    } else {
      this.notisevice.warn('Wrong', 'Please Select Employee Name', {
        animate: 'fromTop'
      })
      return false;
    }

  }

}

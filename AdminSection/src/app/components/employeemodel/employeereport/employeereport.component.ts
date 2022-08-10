import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { EmployeeaccService } from 'src/app/services/employee/employeeacc.service';
import { EmployeeserService } from 'src/app/services/employee/employeeser.service';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { SalesserService } from 'src/app/services/sales/salesser.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-employeereport',
  templateUrl: './employeereport.component.html',
  styleUrls: ['./employeereport.component.css']
})
export class EmployeereportComponent implements OnInit {

  allEmployeeAccount: any = null; singleEmployeeAccount:any=[]; allEmployeeAccountTableItem: any = null;

  allProduct: any = null; singleEmployeeSales:any=[]; productTableItem: any = null;

  allEmployeeList: any; 

  totalsales: any = null; totalprofit: any = null; totalCost:any=0;

  employeeID:any=null;employeename: any = ''; username: any = 'rana' ;fromValue:any=null;


  refreshactive = new BehaviorSubject<boolean>(true);

  employeeimage = environment.imageUrl+"employeeImage/"

  constructor(private employeeacc: EmployeeaccService, private employeeser: EmployeeserService,
    private salesser: SalesserService) {
    this.setAllEmployee()
    this.getAllEmployeeAccount()
    this.setAllProduct()
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.employeename;this.totalprofit,this.totalsales
      this.allEmployeeAccountTableItem;
      this.productTableItem
    })

    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }

  setName(value: any) {
    this.singleEmployeeAccount=[]
    this.singleEmployeeSales=[]
    this.employeename = value.Employee_Name;
    this.employeeID=value.Employee_ID
    this.allEmployeeAccount.map((item:any)=>{
      if(item.Employee_ID==this.employeeID){
        this.singleEmployeeAccount.push(item)
      }
    })
    this.allEmployeeAccountTableItem=this.singleEmployeeAccount;
    this.setTotalCost()

    this.allProduct.map((item:any)=>{
      if(item.SR_ID==this.employeeID){
        this.singleEmployeeSales.push(item)
      }
    })
    this.productTableItem=this.singleEmployeeSales;
     this.setProductTotal()
  }

  setAllEmployee() {
    var formdata = new FormData();
    formdata.append('User_ID', this.username)
    this.employeeser.getallEmployee(formdata).subscribe((result) => {
      this.allEmployeeList = result;
      //console.warn(this.allEmployeeList)
    })
  }

  getAllEmployeeAccount() {
    var formdata = new FormData();
    formdata.append('User_ID', this.username)
    this.employeeacc.getallEmployeeAcc(formdata).subscribe((result) => {
      this.allEmployeeAccount = result;
     // this.allEmployeeAccountTableItem=this.allEmployeeAccount;
    // console.warn(this.allEmployeeAccount)
    this.setTotalCost()
    })
  }

  setTotalCost(){
    this.totalCost=0;
    this.allEmployeeAccountTableItem.map((item: any) => {
      this.totalCost += item.Amount;
    })
  }


  setAllProduct() {
    var formdata = new FormData();
    formdata.append('User_ID', this.username);
    this.salesser.getInvoiceSalesItem(formdata).subscribe((result) => {
      this.allProduct = result;
      this.productTableItem = this.allProduct;
      //console.warn(this.allProduct)
      this.setProductTotal()
    })
  }

  setProductTotal() {
    this.totalprofit=0
    this.totalsales=0
    this.productTableItem.map((item: any) => {
      this.totalsales += item.Total_Price;
      this.totalprofit += ((item.Sales_Price) - (item.product_g_r_n.Producut_Price)) * item.Quantaty;
    })
  }


  fromProduct(value: any) {
    this.allEmployeeAccountTableItem=[]
    this.productTableItem=[]
    this.fromValue = value;
    if (value != null) {
      if (this.singleEmployeeAccount.length>0 || this.singleEmployeeSales.length>0) {
        this.singleEmployeeAccount.map((item: any) => {
          if (item.Date == value) {
            this.allEmployeeAccountTableItem.push(item)
            this.setTotalCost()
          }
        }); 
        this.singleEmployeeSales.map((item: any) => {
          if (item.Sales_Date == value) {
            this.productTableItem.push(item)
            this.setProductTotal()
          }
        }); 
      } else {
        alert('Select Employee Name Frist')
      }
    } else {
      alert('Select Date')
    }
  }

  toProduct(value: any) {
    this.allEmployeeAccountTableItem=[]
    this.productTableItem=[]
    if (value != null) {
      this.singleEmployeeAccount.map((item: any) => {
        if (item.Date >= this.fromValue && item.Date <= value) {
          this.allEmployeeAccountTableItem.push(item)
          this.setTotalCost()
        }
      }); 
      this.singleEmployeeSales.map((item: any) => {
        if (item.Sales_Date >= this.fromValue && item.Sales_Date <= value) {
          this.productTableItem.push(item)
          this.setProductTotal()
        }
      }); 
    } else {
      alert('hellow')
    }
  }



}



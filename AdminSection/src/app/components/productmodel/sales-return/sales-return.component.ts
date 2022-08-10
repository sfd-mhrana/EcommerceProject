import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { SalesaccserService } from 'src/app/services/sales/salesaccser.service';
import { SalesserService } from 'src/app/services/sales/salesser.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-sales-return',
  templateUrl: './sales-return.component.html',
  styleUrls: ['./sales-return.component.css']
})
export class SalesReturnComponent implements OnInit {
  username = 'rana'; todaydate: any;

  invoiceno: any = ''; checkreturnq: boolean = false;

  allsalesInvoice: any = null;

  totalSales: any = 0; totalProfit: any = 0; totalIndex: any = 0;

  returnlastquantaty: any; returnQuantaty: any; returnlastPrice: any;

  allProduct: any = null; allTableItem: any = null; allInvoiceItem: any = null;

  refreshactive = new BehaviorSubject<boolean>(true);
  constructor(private salesAcc: SalesaccserService, private salesser: SalesserService, private notisevice: NotificationsService, private datePipe: DatePipe,) {
    this.setAllinvoice()
    this.setAllProduct()
    var date = new Date();
    this.todaydate = this.datePipe.transform(date, "yyyy-MM-dd");
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.invoiceno;
    })

    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }

  setInvoice(value: any) {
    this.allTableItem = []
    this.invoiceno = value.Invoice_No;
    this.allProduct.map((item: any) => {
      if (item.Invoice_No == this.invoiceno) {
        this.allTableItem.push(item)
      }
    })
    this.allInvoiceItem = this.allTableItem;
    this.setTotal()
  }

  setAllinvoice() {
    const formData = new FormData();
    formData.append('User_ID', this.username);
    this.salesAcc.getAllInvoiceacc(formData).subscribe((result) => {
      this.allsalesInvoice = result;
    })
  }

  setAllProduct() {
    var productIndex = 0;
    var getAlllProduct: any = []
    var formdata = new FormData();
    formdata.append('User_ID', this.username);
    this.salesser.getInvoiceSalesItem(formdata).subscribe((result: any) => {

      result.map((item: any) => {
        var object: any = new Object();
        object.Category_Id = item.Category_Id;
        object.Product_Id = item.Product_Id;
        object.id = item.id;
        object.Company_Name = item.Company_Name;
        object.Invoice_No = item.Invoice_No;
        object.employee = item.employee;
        object.Sales_Date = item.Sales_Date;
        object.GRN = item.GRN;
        object.product_g_r_n = item.product_g_r_n;
        object.User_ID = item.User_ID;
        object.SR_ID = item.SR_ID;
        object.Sales_Price = item.Sales_Price;
        object.Quantaty = item.Quantaty;
        object.Total_Price = item.Total_Price;
        object.category = item.category;
        object.product = item.product;
        object.returnlastQuan = 0;
        object.returnlastPrice = 0;
        object.index = productIndex++;
        getAlllProduct.push(object)
      })
      this.allProduct = getAlllProduct;
      this.allTableItem = this.allProduct;
    })
  }

  setTotal() {
    this.totalIndex = 0; this.totalProfit = 0; this.totalSales = 0;
    this.allTableItem.map((item: any) => {
      this.totalSales += item.Total_Price;
      this.totalProfit += ((item.Sales_Price) - (item.product_g_r_n.Producut_Price)) * item.Quantaty;
    })
    this.totalIndex += this.allTableItem.length
  }

  setReturnQuantaty(event: any, array: any) {
    var input = event.target.value

    if (input > array.Quantaty) {
      this.checkreturnq = false;
      this.notisevice.alert('Warning', 'Please, Give Quantaty Less Than ' + array.Quantaty, {
        animate: 'fromTop'
      })
    } else {
      this.checkreturnq = true;
      this.returnQuantaty = input;
      this.returnlastquantaty = array.Quantaty - input;
      this.returnlastPrice = array.Sales_Price * this.returnlastquantaty;
      this.allProduct[array.index].returnlastQuan = array.Quantaty - input;
      this.allProduct[array.index].returnlastPrice = array.Sales_Price * this.returnlastquantaty;

    }
  }
  submitreturn(array: any) {
    if (this.checkreturnq) {
      var returntotal: any = array.Sales_Price * this.returnQuantaty;
      const formData = new FormData();
      formData.append('User_ID', this.username);
      formData.append('id', array.id);
      formData.append('Company_Name', array.Company_Name);
      formData.append('Invoice_No', array.Invoice_No);
      formData.append('Product_Id', array.Product_Id);
      formData.append('Category_Id', array.Category_Id);
      formData.append('GRN', array.GRN);
      formData.append('Sales_Date', array.Sales_Date);
      formData.append('Return_Date', this.todaydate);
      formData.append('Quantaty', this.returnlastquantaty);
      formData.append('Return_Quantaty', this.returnQuantaty);
      formData.append('Sales_Price', array.Sales_Price);
      formData.append('Total_Price', this.returnlastPrice);
      formData.append('Return_Total_Price', returntotal);
      formData.append('SR_ID', array.SR_ID);
      this.salesser.returnproduct(formData).subscribe((result: any) => {
        if (result.title == 'Warning') {
          this.notisevice.warn('Warning', result.message, {
            animate: 'fromTop'
          })
        } else {
          this.notisevice.success(result.title, result.message, {
            animate: 'fromTop'
          })
        }
      })
    }
  }
}

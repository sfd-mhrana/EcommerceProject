import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Subject, BehaviorSubject } from 'rxjs'
import { CustommerService } from 'src/app/services/custommer/custommer.service';
import { SalesserService } from 'src/app/services/sales/salesser.service';

@Component({

  selector: 'app-paymentsreport',
  templateUrl: './paymentsreport.component.html',
  styleUrls: ['./paymentsreport.component.css']

})
export class PaymentsreportComponent implements OnInit {

  username: any = 'rana'; allcustommer: any = ''; tableItem:any;

  refreshactive = new BehaviorSubject<boolean>(true); fromValue: any;

  allTableItem: any; total: number = 0; discount: number = 0; paidamount: number = 0;

  allpayments: any; custommerDetails: any = null; custommername: any;

  constructor(private thiser: CustommerService, private salesser: SalesserService) {
    this.setAlldata();
    this.setAllCustommer();
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.allpayments; this.allTableItem;this.tableItem;
    })
    
    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }

  setName(value: any) {
    this.allTableItem = [];
    this.custommerDetails = []
    this.custommername = value.Company_Name;
    this.allpayments.map((item: any) => {
      if (item.Company_Name == this.custommername) {
        this.custommerDetails.push(item)
      }
    })
    this.allTableItem = this.custommerDetails;
    this.counttotal()
  }

  setAllCustommer() {
    var formdata = new FormData();
    formdata.append('User_ID', this.username);
    this.salesser.getAllCustommer(formdata).subscribe((result) => {
      this.allcustommer = result;
    })
  }

  setAlldata() {
    var fromdata = new FormData();
    fromdata.append('User_ID', this.username);
    this.thiser.getcustommerpayments(fromdata).subscribe((result) => {
      this.allpayments = result;
      this.allTableItem = this.allpayments;
      if (this.allTableItem.length == 0) {
       // alert('no Data Found');
       this.counttotal();
      } else {
        this.counttotal();
        //console.warn(this.allTableItem)
      }
    })
  }

  fromProduct(value: any) {
    this.allTableItem = []
    this.fromValue = value;
    if (this.custommerDetails!=null) {
      if (value != null) {
        this.custommerDetails.map((item: any) => {
          if (item.Sales_Date == value) {
            this.allTableItem.push(item)
          }
        });
        console.warn(this.allTableItem.length)
        if (this.allTableItem.length == 0) {
           //alert('no Data Found');
           this.counttotal();
        } else {
          this.counttotal();
          //console.warn(this.allTableItem)
        }

      } else {
       // alert('hellow')
      }
    } else {
      if (value != null) {
        this.allpayments.map((item: any) => {
          if (item.Sales_Date == value) {
            this.allTableItem.push(item)
          }
        });
        console.warn(this.allTableItem.length)
        if (this.allTableItem.length == 0) {
          //alert('no Data Found');
          this.counttotal();
        } else {
          this.counttotal();
          //console.warn(this.allTableItem)
        }

      } else {
      //alert('hellow')
      }
    }

  }

  toProduct(value: any) {
    this.allTableItem = []
    if (this.custommerDetails!= null) {
      if (value != null) {
        this.custommerDetails.map((item: any) => {
          if (item.Sales_Date >= this.fromValue && item.Sales_Date <= value) {
            this.allTableItem.push(item)
          }
        });
        if (this.allTableItem.length == 0) {
          //alert('no Data Found')
          this.counttotal();
        } else {
          this.counttotal();
          //console.warn(this.allTableItem)
        }
      } else {
      //alert('hellow')
      }
    } else {
      if (value != null) {
        this.allpayments.map((item: any) => {
          if (item.Sales_Date >= this.fromValue && item.Sales_Date <= value) {
            this.allTableItem.push(item)
          }
        });
        if (this.allTableItem.length == 0) {
      // alert('no Data Found')
      this.counttotal();
        } else {
          this.counttotal();
          //console.warn(this.allTableItem)
        }
      } else {
      //alert('hellow')
      }
    }

  }
 
  counttotal() {
    this.tableItem=[];
    var due=0;
    for (const key in this.allTableItem) {
      var cumpaniproductlist: any = new Object();
      cumpaniproductlist.Company_Name = this.allTableItem[key].Company_Name;
      cumpaniproductlist.Invoice_No = this.allTableItem[key].Invoice_No;
      cumpaniproductlist.Sales_Date = this.allTableItem[key].Sales_Date;
      cumpaniproductlist.Discount = this.allTableItem[key].Discount;
      cumpaniproductlist.Paid = this.allTableItem[key].Paid;
      cumpaniproductlist.Invoices = this.allTableItem[key].invoices;
      due = due+parseInt(this.allTableItem[key].Total_Amount)-(parseInt(this.allTableItem[key].Discount)+parseInt(this.allTableItem[key].Paid));
      cumpaniproductlist.Due =due;
      this.tableItem.push(cumpaniproductlist);
    }


    this.total = this.allTableItem.map((item: any) => { return parseInt(item.Total_Amount) }).reduce((prev: number, next: number) => (prev + next));
    this.discount = this.allTableItem.map((item: any) => { return parseInt(item.Discount) }).reduce((prev: number, next: number) => (prev + next));
    this.paidamount = this.allTableItem.map((item: any) => { return parseInt(item.Paid) }).reduce((prev: number, next: number) => (prev + next));
  }
}

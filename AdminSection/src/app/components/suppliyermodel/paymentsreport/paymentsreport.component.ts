import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { CustommerService } from 'src/app/services/custommer/custommer.service';
import { SalesserService } from 'src/app/services/sales/salesser.service';
import { SuppliyerService } from 'src/app/services/suppliyer/suppliyer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-paymentsreport',
  templateUrl: './paymentsreport.component.html',
  styleUrls: ['./paymentsreport.component.css']
})
export class PaymentsreportComponent implements OnInit {

  username: any = 'rana'; allSuppliyer: any; suppliyername: any; suppliyerdetils: any;
  refreshactive = new BehaviorSubject<boolean>(true); fromValue: any;

  allTableItem: any; total: any; discount: any; paidamount: any; tableItem:any;

  allpayments: any; showitems: any;

  suppliyeriamge: any = environment.imageUrl+"suppliyerImage/";


  constructor(private thiser: SuppliyerService, private suppliyer: SuppliyerService) {
    this.setAlldata();
    this.setSetAllSuppliyer()
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.allpayments; this.allTableItem;
    })
    
    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    }); 
  }

  setName(value: any) {
    this.suppliyername = value.Company_Name+"/"+value.Address;
    this.suppliyerdetils = [];
    this.allpayments.map((item: any) => {
      if (item.Company_Name == this.suppliyername) {
        this.suppliyerdetils.push(item)
      }
    })
    this.allTableItem = this.suppliyerdetils;
    this.counttotal()
  }

  setSetAllSuppliyer() {
    const formData = new FormData();
    formData.append('User_ID', this.username);
    this.suppliyer.getAllSuppliyer(formData).subscribe((result) => {
      this.allSuppliyer = result;
      //console.log(this.allSuppliyer)
    })
  }

  setAlldata() {
    var fromdata = new FormData();
    fromdata.append('User_ID', this.username);
    this.thiser.getsuppliyerpayments(fromdata).subscribe((result) => {
      this.allpayments = result;
      this.allTableItem = this.allpayments;
      if (this.allTableItem.length == 0) {
        this.counttotal();
      } else {
        this.counttotal();
      }
    })
  }

  fromProduct(value: any) {
    this.allTableItem = []
    this.fromValue = value;
    if (this.suppliyerdetils.length != null) {
      if (value != null) {
        this.suppliyerdetils.map((item: any) => {
          if (item.Purchase_Date == value) {
            this.allTableItem.push(item)
          }
        });
       // console.warn(this.allTableItem.length) 
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
          if (item.Purchase_Date == value) {
            this.allTableItem.push(item)
          }
        });
        //console.warn(this.allTableItem.length)
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
    }

  }

  toProduct(value: any) {
    this.allTableItem = []
    if (this.suppliyerdetils.length != null) {
      if (value != null) {
        this.suppliyerdetils.map((item: any) => {
          if (item.Purchase_Date >= this.fromValue && item.Purchase_Date <= value) {
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
          if (item.Purchase_Date >= this.fromValue && item.Purchase_Date <= value) {
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
       // alert('hellow')
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
      cumpaniproductlist.Purchase_Date = this.allTableItem[key].Purchase_Date;
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

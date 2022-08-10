import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { SalesserService } from 'src/app/services/sales/salesser.service';

@Component({
  selector: 'app-salesbycustommer',
  templateUrl: './salesbycustommer.component.html',
  styleUrls: ['./salesbycustommer.component.css']
})
export class SalesbycustommerComponent implements OnInit {
  username: any = 'rana';

  custommername: any;

  fromValue: any;

  allcustommer: any = null;

  allTableItem: any = null; allProduct: any = null; allCustommerProduct: any = [];

  totalSales: any = 0; totalProfit: any = 0; totalIndex: any = 0;

  refreshactive = new BehaviorSubject<boolean>(true);
  constructor(private salesser: SalesserService) {
    this.setAllCustommer();
    this.setAllProduct();
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.custommername;
    })

    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }

  setName(value: any) {
    this.allTableItem = [];
    this.custommername = value.Company_Name;

    this.allProduct.map((item: any) => {
      if (item.Company_Name == this.custommername) {
        this.allTableItem.push(item);
      }
    })
    this.allCustommerProduct = this.allTableItem;
    this.setTotal()
  }

  setAllCustommer() {
    var formdata = new FormData();
    formdata.append('User_ID', this.username);
    this.salesser.getAllCustommer(formdata).subscribe((result) => {
      this.allcustommer = result;
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
 
  setAllProduct() {
    var formdata = new FormData();
    formdata.append('User_ID', this.username);
    this.salesser.getInvoiceSalesItem(formdata).subscribe((result) => {
      this.allProduct = result;
      this.allTableItem = this.allProduct;
      this.setTotal()
    })
  }

  fromProduct(value: any) {
    this.allTableItem = []
    this.fromValue = value;
    if (value != null) {
      if (this.allCustommerProduct != null) {
        this.allCustommerProduct.map((item: any) => {
          if (item.Sales_Date == value) {
            this.allTableItem.push(item)
          }
        });
        console.warn(this.allTableItem.length)
        if (this.allTableItem.length == 0) {
          alert('no Data Found');
        } else {
          this.setTotal()
        }
      }
    } else {
      alert('hellow')
    }
  }

  toProduct(value: any) {
    this.allTableItem = []
    if (value != null) {
      this.allCustommerProduct.map((item: any) => {
        if (item.Sales_Date >= this.fromValue && item.Sales_Date <= value) {
          this.allTableItem.push(item)
        }
      });
      if (this.allTableItem.length == 0) {
        alert('no Data Found')
      } else {
        this.setTotal()
      }
    } else {
      alert('hellow')
    }
  }
}

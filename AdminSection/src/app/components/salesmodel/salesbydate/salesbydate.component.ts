import { Component, OnInit } from '@angular/core';
import { SalesserService } from 'src/app/services/sales/salesser.service';

@Component({
  selector: 'app-salesbydate',
  templateUrl: './salesbydate.component.html',
  styleUrls: ['./salesbydate.component.css']
})
export class SalesbydateComponent implements OnInit {
  username: any = 'rana';


 
  fromValue: any;

  allTableItem: any = null; allProduct: any = null;

  totalSales: any = 0; totalProfit: any = 0; totalIndex: any = 0;
  
  constructor(private salesSer:SalesserService) { 
    this.setAllProduct()
  }

  ngOnInit(): void {
  }

  setAllProduct() {
    var formdata = new FormData();
    formdata.append('User_ID', this.username);
    this.salesSer.getInvoiceSalesItem(formdata).subscribe((result) => {
      this.allProduct = result;
      this.allTableItem = this.allProduct;
      this.setTotal()
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

  fromProduct(value: any) {
    this.allTableItem = []
    this.fromValue = value;
    if (value != null) {
      if (this.allProduct != null) {
        this.allProduct.map((item: any) => {
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
      this.allProduct.map((item: any) => {
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

import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { DatePipe } from '@angular/common';
import { PurchasesserService } from '../../../services/purchases/purchasesser.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-purchasesbydate',
  templateUrl: './purchasesbydate.component.html',
  styleUrls: ['./purchasesbydate.component.css']
})
export class PurchasesbydateComponent implements OnInit {
  username: any = 'rana';

  tableItem: any;
  refreshactive = new BehaviorSubject<boolean>(true);
  allproduct: any = null; totalItem: any = 0; totalAmount: any; totalQuentaty: any; fromValue: any = null;

  imgurl: any = environment.imageUrl+"productImage/"
  suppliyeriamge: any = environment.imageUrl+"suppliyerImage/";
  constructor(private datePipe: DatePipe, private productSer: PurchasesserService,) {
    this.setAllProduct();
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.tableItem; this.totalAmount; this.totalQuentaty; this.totalItem;
    })

  }


  setAllProduct() {
    this.tableItem = []
    const formDatai = new FormData();
    formDatai.append('User_ID', this.username);
    this.productSer.allPurProduct(formDatai).subscribe((result) => {
      this.allproduct = result;
      this.tableItem = this.allproduct;
      this.totalAmount = this.tableItem.map((item: any) => item.Total_Price).reduce((prev: any, next: any) => prev + next);
      this.totalQuentaty = this.tableItem.map((item: any) => item.Quantaty).reduce((prev: any, next: any) => prev + next);
      this.totalItem = this.tableItem.length;
     // console.warn(this.tableItem)
    })
  }
 
  fromProduct(value: any) {
    this.tableItem = []
    this.fromValue=value;
    if (value != null) {
      this.allproduct.map((item: any) => {
        if (item.Purchase_Date == value) {
          this.tableItem.push(item)
        }
      });
      console.warn(this.tableItem.length)
      if(this.tableItem.length==0){
        //  alert('no Data Found');
      }else{
        this.totalAmount = this.tableItem.map((item: any) => item.Total_Price).reduce((prev: any, next: any) => prev + next);
        this.totalQuentaty = this.tableItem.map((item: any) => item.Quantaty).reduce((prev: any, next: any) => prev + next);
        this.totalItem = this.tableItem.length;
        //console.warn(this.tableItem)
      }
      
    } else {
      //alert('hellow')
    }
  }

  toProduct(value: any) {
    this.tableItem = []
    if (value != null) {
      this.allproduct.map((item: any) => {
        if (item.Purchase_Date >= this.fromValue && item.Purchase_Date <= value) {
          this.tableItem.push(item)
        }
      });
      if (this.tableItem.length == 0) {
       // alert('no Data Found')
      } else {
        this.totalAmount = this.tableItem.map((item: any) => item.Total_Price).reduce((prev: any, next: any) => prev + next);
        this.totalQuentaty = this.tableItem.map((item: any) => item.Quantaty).reduce((prev: any, next: any) => prev + next);
        this.totalItem = this.tableItem.length;
        //console.warn(this.tableItem)
      }
    } else {
    //  alert('hellow')
    }
  }

}

import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {Subject,BehaviorSubject,Observable} from 'rxjs'
import { PurchasesserService } from 'src/app/services/purchases/purchasesser.service';
import { SuppliyerService } from 'src/app/services/suppliyer/suppliyer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-purchasesbysuppliyer',
  templateUrl: './purchasesbysuppliyer.component.html',
  styleUrls: ['./purchasesbysuppliyer.component.css']
})
export class PurchasesbysuppliyerComponent implements OnInit {
  suppliyername:any=null;
  refreshactive=new BehaviorSubject<boolean>(true);

  username='rana'; allSuppliyer:any=null; tableItem:Array<any>=[];

  allproduct:any=null; totalItem:any=0; totalAmount:any;totalQuentaty:any;

  imgurl:any = environment.imageUrl+"productImage/"
  suppliyeriamge: any = environment.imageUrl+"suppliyerImage/";
  constructor(private purchaseser:PurchasesserService,private suppliyer:SuppliyerService,) {
    this.setAllProduct();
      this.setSetAllSuppliyer();
   }

  ngOnInit(): void {
  
    this.refreshactive.subscribe(()=>{
      this.suppliyername;this.tableItem;this.totalAmount;this.totalQuentaty; this.totalItem;
    })
   
    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }
   
 
  setName(value:any){
    this.tableItem=[];
    this.suppliyername = value.Company_Name + "/" + value.Address;
    if(this.suppliyername!=null){
      this.allproduct.map((item:any) => {
        if(item.Company_Name==this.suppliyername){
          this.tableItem.push(item)
        }
      });
      
      this.totalAmount=this.tableItem.map((item:any) => item.Total_Price).reduce((prev:any, next:any) => prev + next);
      this.totalQuentaty=this.tableItem.map((item:any) => item.Quantaty).reduce((prev:any, next:any) => prev + next);
      this.totalItem=this.tableItem.length;
      //console.warn(this.tableItem)
    }
  }

  setAllProduct(){
    this.tableItem=[]
    const formDatai = new FormData();
    formDatai.append('User_ID', this.username);
    this.purchaseser.allPurProduct(formDatai).subscribe((result) => {
      this.allproduct = result;
      this.tableItem=this.allproduct;
      this.totalAmount=this.tableItem.map((item:any) => item.Total_Price).reduce((prev:any, next:any) => prev + next);
      this.totalQuentaty=this.tableItem.map((item:any) => item.Quantaty).reduce((prev:any, next:any) => prev + next);
      this.totalItem=this.tableItem.length;
      //console.warn(this.tableItem)
    })
  }

  setSetAllSuppliyer() {
    const formData = new FormData();
    formData.append('User_ID', this.username);
    this.suppliyer.getAllSuppliyer(formData).subscribe((result) => {
      this.allSuppliyer = result;
      //console.log(this.allSuppliyer)
    })
  }
}

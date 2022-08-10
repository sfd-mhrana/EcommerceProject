import { Component, OnInit } from '@angular/core';
import { PurchasesserService } from 'src/app/services/purchases/purchasesser.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-purchasesproduct',
  templateUrl: './purchasesproduct.component.html',
  styleUrls: ['./purchasesproduct.component.css']
})
export class PurchasesproductComponent implements OnInit {
  username='rana'

  allproduct:any=null; totalItem:any=0; totalAmount:any;totalQuentaty:any;

  imgurl:any = environment.imageUrl+"productImage/"
  
  constructor(private purchaseser:PurchasesserService) {
    this.setAllProduct();
  }
 
  ngOnInit(): void {
  }

  setAllProduct(){
    const formDatai = new FormData();
    formDatai.append('User_ID', this.username);
    this.purchaseser.allPurProduct(formDatai).subscribe((result) => {
      this.allproduct = result;
      this.totalAmount=this.allproduct.map((item:any) => item.Total_Price).reduce((prev:any, next:any) => prev + next);
      this.totalQuentaty=this.allproduct.map((item:any) => item.Quantaty).reduce((prev:any, next:any) => prev + next);
      this.totalItem=this.allproduct.length;
      console.warn(this.allproduct)
    })
  }

}

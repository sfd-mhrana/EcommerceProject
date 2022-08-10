import { Component, OnInit } from '@angular/core';
import { SalesserService } from 'src/app/services/sales/salesser.service';

@Component({
  selector: 'app-salesproduct',
  templateUrl: './salesproduct.component.html',
  styleUrls: ['./salesproduct.component.css']
})
export class SalesproductComponent implements OnInit {
  username='rana';
  allItem:any=null;

  totalsales:any=0;totalprofit:any=0; totalindex:any=0;

  constructor(private salesSer:SalesserService) { 
    this.setAllProduct()
  }
 
  ngOnInit(): void { 
  }

  setAllProduct(){
    var formdata=new FormData();
    formdata.append('User_ID', this.username);
    this.salesSer.getInvoiceSalesItem(formdata).subscribe((result)=>{
      this.allItem=result;
      this.allItem.map((item:any)=>{
          this.totalsales+=item.Total_Price;
          this.totalprofit+= ( (item.Sales_Price)-(item.product_g_r_n.Producut_Price))*item.Quantaty;
      })
      this.totalindex+=this.allItem.length
    }) 
  }

}

import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {Subject,BehaviorSubject,Observable} from 'rxjs'
import { DatePipe } from '@angular/common';
import { PurchasesserService } from '../../../services/purchases/purchasesser.service';
import { PurchasesaccService } from 'src/app/services/purchases/purchasesacc.service';
import { SuppliyerService } from 'src/app/services/suppliyer/suppliyer.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
 
@Component({
  selector: 'app-purchasesreturn',
  templateUrl: './purchasesreturn.component.html',
  styleUrls: ['./purchasesreturn.component.css']
})
export class PurchasesreturnComponent implements OnInit {

  username: any = 'rana'; 
  //Design Section
  suppliyername: any = ''; invoiceno: string = ''; tableItem: any=null;
  refreshactive = new BehaviorSubject<boolean>(true);

  allSuppliyer: any = null; todaydate: any; allInvoiceAcc: any; 
  
  returnlastquantaty:any=0; returnlastPrice:any=0; returnQuantaty:any;
 
  returnq:boolean=false;

  allproduct:any=null; totalItem:any=0; totalAmount:any;totalQuentaty:any;

  imgurl:any = environment.imageUrl+"productImage/"
  suppliyeriamge: any = environment.imageUrl+"suppliyerImage/";

  constructor(private purchasesacc: PurchasesaccService,private suppliyer:SuppliyerService, private productSer: PurchasesserService,
     private datePipe: DatePipe,private notisevice:NotificationsService,) {
      var date = new Date();
      this.todaydate = this.datePipe.transform(date, "yyyy-MM-dd");
    this.setSetAllSuppliyer();
    this.setAllProduct();
   }

   ngOnInit(): void {
  
    this.refreshactive.subscribe(()=>{
      this.suppliyername; this.invoiceno; this.allInvoiceAcc; this.allSuppliyer; this.tableItem;
      this.totalAmount;this.totalQuentaty; this.totalItem;
      this.returnlastPrice;this.returnlastquantaty;
     
    })
   
    $('.dropdown').click(function () {
      
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });

  }

  setAllProduct(){
    var productIndex = 0;
    var getAlllProduct:any=[];
    this.tableItem=[]
    const formDatai = new FormData();
    formDatai.append('User_ID', this.username);
    this.productSer.allPurProduct(formDatai).subscribe((result:any) => {
      result.map((item:any)=>{
        var object: any = new Object();
        object.Category_Id = item.Category_Id;
        object. id= item.id;
        object. Company_Name= item.Company_Name;
        object. Invoice_No= item.Invoice_No;
        object.  Product_Id= item.Product_Id;
        object.  Producut_Price= item.Producut_Price;
        object.  Purchase_Date= item.Purchase_Date;
        object.  Quantaty= item.Quantaty;
        object.  User_ID= item.User_ID;
        object.  Total_Price= item.Total_Price;
        object.  category= item.category;
        object.  product= item.product;
        object. returnlastQuan=0;
        object. returnlastPrice=0;
        object. index=productIndex++;
        getAlllProduct.push(object)
      })
      this.allproduct = getAlllProduct;
      this.tableItem=this.allproduct;
      //console.warn(this.tableItem)
    })
  }

  setInvioceItem(value: any) {
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
      console.warn(this.tableItem)
    }
    this.getAllbillBySuppliyer(this.suppliyername)
  }

  setInvoice(value: any) {
    this.invoiceno = value.Invoice_No;
    this.tableItem=[];
    if(this.suppliyername!=null){
      this.allproduct.map((item:any) => {
        if(item.Company_Name==this.suppliyername && item.Invoice_No==this.invoiceno){
          this.tableItem.push(item)
        } 
      });
      this.totalAmount=this.tableItem.map((item:any) => item.Total_Price).reduce((prev:any, next:any) => prev + next);
      this.totalQuentaty=this.tableItem.map((item:any) => item.Quantaty).reduce((prev:any, next:any) => prev + next);
      this.totalItem=this.tableItem.length;
      //console.warn(this.tableItem)
    }else{
      alert('hellow')
    }
  }

  setSetAllSuppliyer() {
    const formData = new FormData();
    formData.append('User_ID', this.username);
    this.suppliyer.getAllSuppliyer(formData).subscribe((result) => {
      this.allSuppliyer = result;
      console.log(this.allSuppliyer)
    })
  }

  getAllbillBySuppliyer(cumpanyname: any) {
    const formData = new FormData();
    formData.append('User_ID', this.username);
    formData.append('Company_Name', cumpanyname);
    this.purchasesacc.getAllbillByCustommer(formData).subscribe((result) => {
      this.allInvoiceAcc=result;
    })
  }

  setReturnQuantaty(event:any,array:any){
    var input = event.target.value
   
    if(input>array.Quantaty){
      this.returnq=false;
      this.notisevice.alert('Warning','Please, Give Quantaty Less Than '+array.Quantaty,{
        animate:'fromTop'
      })
    }else{
      this.returnq=true;
      this.returnQuantaty=input;
      this.returnlastquantaty=array.Quantaty-input;
      this.returnlastPrice=array.Producut_Price* this.returnlastquantaty;
      this.allproduct[array.index].returnlastQuan = array.Quantaty-input;
      this.allproduct[array.index].returnlastPrice = array.Producut_Price* this.returnlastquantaty;
     
    }
  }

  submitreturn(array:any){
    if(this.returnq){
       var returntotal:any=array.Producut_Price*this.returnQuantaty;
      const formData = new FormData();
      formData.append('User_ID', this.username);
      formData.append('id', array.id);
      formData.append('Company_Name', array.Company_Name);
      formData.append('Invoice_No', array.Invoice_No);
      formData.append('Product_Id',array.product.Product_ID);
      formData.append('Category_Id', array.category.id);
      formData.append('Purchase_Date', array.Purchase_Date);
      formData.append('Return_Date', this.todaydate);
      formData.append('Quantaty', this.returnlastquantaty);
      formData.append('Return_Quantaty', this.returnQuantaty);
      formData.append('Producut_Price',array.Producut_Price);
      formData.append('Total_Price',this.returnlastPrice);
      formData.append('Return_Total_Price',returntotal);
      this.productSer.returnproduct(formData).subscribe((result: any) => {
        console.warn(result)
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
    }else{

    }
   
  }
 
}

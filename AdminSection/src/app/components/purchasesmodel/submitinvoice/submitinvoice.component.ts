import { Component, OnInit } from '@angular/core';
import { PurchasesaccService } from 'src/app/services/purchases/purchasesacc.service';
import { AccountsserService } from 'src/app/services/account/accountsser.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs'

@Component({
  selector: 'app-submitinvoice',
  templateUrl: './submitinvoice.component.html',
  styleUrls: ['./submitinvoice.component.css']
})
export class SubmitinvoiceComponent implements OnInit {
  username = 'rana';
  allNonSubmitProduct: any; allByCumpani: any = []; allProductCbyProduct: any = []; AlldefferentInvoice: any = [];
  showAllinvoiceacc: any = []; readonly: any = false; noData: any = false;

  refreshactive = new BehaviorSubject<boolean>(true);

  discount: any = 0; paidamount: any = 0; dueAmount: any = 0;

  fromDate: any = null; toDate: any = null;

  constructor(private purchasesAcc: PurchasesaccService, private cashser: AccountsserService,) {
    this.getAllNonSubmitBill();
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.dueAmount; this.allProductCbyProduct;
    })
  }

  getAllNonSubmitBill() {
    this.allNonSubmitProduct; this.allByCumpani = []; this.allProductCbyProduct = [];
    this.showAllinvoiceacc = [];this.AlldefferentInvoice=[];
    var productIndex = 0;
    const formDatai = new FormData();
    formDatai.append('User_ID', this.username);
    this.purchasesAcc.nonSubmitBill(formDatai).subscribe((result) => {
      this.allNonSubmitProduct = result;
      this.allByCumpani = groupArrayOfObjects(this.allNonSubmitProduct, 'Company_Name');
      var size = Object.keys(this.allByCumpani).length;
      var keys = Object.keys(this.allByCumpani);
      //console.warn(this.allByCumpani)
      for (var i = 0; i != size; i++) {
        //console.warn(this.allByCumpani[keys[i]])
        this.allProductCbyProduct = groupArrayOfObjects(this.allByCumpani[keys[i]], 'Invoice_No');
        //console.warn( this.allProductCbyProduct)
        var sizew = Object.keys(this.allProductCbyProduct).length;
        var keysa = Object.keys(this.allProductCbyProduct);
        for (var j = 0; j != sizew; j++) {
          //console.warn(this.allProductCbyProduct[keysa[j]])
          var cumpaniproductlist: any = new Object();
          cumpaniproductlist.total = this.allProductCbyProduct[keysa[j]].map((item: any) => item.Total_Price).reduce((prev: any, next: any) => prev + next);
          cumpaniproductlist.invoiceno = this.allProductCbyProduct[keysa[j]][0].Invoice_No;
          cumpaniproductlist.cumpanyname = this.allProductCbyProduct[keysa[j]][0].Company_Name;
          cumpaniproductlist.totalProduct = this.allProductCbyProduct[keysa[j]].length;
          cumpaniproductlist.date = this.allProductCbyProduct[keysa[j]][0].Purchase_Date;
          cumpaniproductlist.dueamount = this.allProductCbyProduct[keysa[j]].map((item: any) => item.Total_Price).reduce((prev: any, next: any) => prev + next);
          cumpaniproductlist.paidamount = 0;
          cumpaniproductlist.discountamount = 0;
          cumpaniproductlist.index = productIndex++;
          this.AlldefferentInvoice.push(cumpaniproductlist);
        }
      }
      this.showAllinvoiceacc = this.AlldefferentInvoice;
      // console.warn(getDefferentCompaniInvoice)

      if (this.showAllinvoiceacc.length < 0) {
        this.readonly = false;
      } else {
        if (this.showAllinvoiceacc.length == 0) {
          this.noData = true;
        } else {
          this.readonly = true;
        }

      }
    })

    function groupArrayOfObjects(list: Array<any>, key: any) {
      return list.reduce(
        (rv: any, x: any) => {
          (rv[x[key]] = rv[x[key]] || [])
            .push(x);
          return rv;
        }, {});
        
    };
  }

  setDueD(value: any, allvalue: any) {
    var input = value.target.value
    this.discount = input;
    if (this.paidamount != 0) {
      this.dueAmount = allvalue.total - this.paidamount - input;
    } else {
      this.dueAmount = allvalue.total - input
    }
    this.showAllinvoiceacc[allvalue.index].dueamount = this.dueAmount;
  }

  setDueP(value: any, allvalue: any) {
    var input = value.target.value
    this.paidamount = input;
    if (this.discount != 0) {
      this.dueAmount = allvalue.total - this.discount - input;
    } else {
      this.dueAmount = allvalue.total - input
    }
    this.showAllinvoiceacc[allvalue.index].dueamount = this.dueAmount;
  }
 
  goToEditData(value: any) {
    var BillDetailsArray = [
      value.cumpanyname, value.invoiceno
    ]
    this.purchasesAcc.setEditBillItem = BillDetailsArray;
  }

  submitInvoiceAcc(value: any) {
    const formdata = new FormData();
    formdata.append('User_ID', this.username);
    formdata.append('Company_Name', value.cumpanyname);
    formdata.append('Invoice_No', value.invoiceno);
    formdata.append('Purchase_Date', value.date);
    formdata.append('Total_Item', value.totalProduct);
    formdata.append('Total_Amount', value.total);
    formdata.append('Discount', this.discount); 
    formdata.append('Paid', this.paidamount);
    formdata.append('Status', 'Cash');
    this.purchasesAcc.createAcc(formdata).subscribe((resul) => {
      if (this.paidamount != 0) {
        const purchasescash = new FormData();
        purchasescash.append('User_ID', this.username);
        purchasescash.append('Date', value.date);
        purchasescash.append('Amount', this.paidamount);
        purchasescash.append('Status', 'Devit');
        purchasescash.append('Details', value.cumpanyname + '/' + value.invoiceno + "/Purchases");
        this.cashser.addCash(purchasescash).subscribe((result) => {
          this.getAllNonSubmitBill();
        })
      }else{
        this.getAllNonSubmitBill();
      }
    })
  }
 
  fromProduct(value: any) {
    this.fromDate = value;
    if (value != null) {
      this.showAllinvoiceacc = [];
      this.AlldefferentInvoice.map((item: any) => {
        if (item.date == value) {
          this.showAllinvoiceacc.push(item)
        }
      })
    }
    if(this.showAllinvoiceacc.length<=0)
    {
      alert("No Invoice Found in This Date.")
    }
  }

  toProduct(value: any) {
    if(value!=null){
      if (this.fromDate != null) {
        this.showAllinvoiceacc = [];
        this.AlldefferentInvoice.map((item: any) => {
          if (item.date>=  this.fromDate && item.date<=value) {
            this.showAllinvoiceacc.push(item)
          }
        })
      } else {
        alert("Please, Select From Frist....")
      }
    }
    if(this.showAllinvoiceacc.length<=0)
    {
      alert("No Invoice Found.")
    }
  }

}


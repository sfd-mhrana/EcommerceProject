import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";


import { PurchasesserService } from '../../../services/purchases/purchasesser.service'
import { PublicServiceService } from 'src/app/services/public-service.service';
import { PurchasesaccService } from 'src/app/services/purchases/purchasesacc.service';
import { AccountsserService } from 'src/app/services/account/accountsser.service';
import { SuppliyerService } from 'src/app/services/suppliyer/suppliyer.service';
import { ProductserService } from 'src/app/services/product/productser.service';
import { CategoryService } from 'src/app/services/product/category.service';
import { CostingserService } from 'src/app/services/account/costingser.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-newpurchases',
  templateUrl: './newpurchases.component.html',
  styleUrls: ['./newpurchases.component.css']
})
export class NewpurchasesComponent implements OnInit {
  //Design Section
  suppliyername: any = '';
  categoryname: any = ''; categoryId: any = '';
  productname: any = ''; productId: any = '';
  refreshactive = new BehaviorSubject<boolean>(true);

  //Develop Section
  username: any = 'rana';

  allInvoiceTotal: any = 0; totoalInvoiceItem: any = 0; allInvoiceItem: any = null;

  todaydate: any; checkbill: any = 'frist';

  selectedProduct: any = null; adddata: boolean = false; userdata: any = ''; updateD: boolean = false; updatepid: any = null;

  paidAmount: any = 0; discountAmount: any = 0; dueAmount: any = 0; costing: any = 0;

  isReadOnly: boolean = false; invoiceNo: any = null;

  form!: FormGroup;
  totalprice: any = 0;

  allSuppliyer: any; allCategory: any; allProduct: any;

  productimage: any = environment.imageUrl+"productImage/";
  suppliyeriamge: any = environment.imageUrl+"suppliyerImage/";

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe,
    private productSer: PurchasesserService, private publicser: PublicServiceService, private purchasesAcc: PurchasesaccService,
    private costingser: CostingserService, private cashser: AccountsserService, private suppliyer: SuppliyerService, private productSe: ProductserService,
    private categoryser: CategoryService, private notisevice: NotificationsService,
  ) {
    var date = new Date();
    this.todaydate = this.datePipe.transform(date, "yyyy-MM-dd");
    this.createForm();
    this.setSetAllSuppliyer();
    this.setAllcategory();
    if (this.purchasesAcc.setEditBillItem != null) {
      this.suppliyername = this.purchasesAcc.setEditBillItem[0]
      this.invoiceNo = this.purchasesAcc.setEditBillItem[1]
      this.form.reset(
        {
          User_ID: this.username,
          Company_Name: this.suppliyername,
          Invoice_No: this.invoiceNo,
          Product_Id: null,
          Category_Id: null,
          Purchase_Date: null,
          Quantaty: 0,
          Producut_Price: 0,
          Total_Price: 0,
        }
      )
      this.isReadOnly = true;
      this.setInvoice(this.suppliyername, this.invoiceNo)
    }
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.suppliyername; this.categoryname; this.productname; this.totalprice; this.allInvoiceItem; this.isReadOnly; this.todaydate;
      this.allInvoiceTotal; this.totoalInvoiceItem; this.dueAmount;
    })

    if (this.publicser.editbill != null) {
      let cumpani = this.publicser.editbill.cumpani;
      let invoice = this.publicser.editbill.invoice;
      this.setInvoice(cumpani, invoice);
      this.totalprice = 0;
      this.form.reset(
        {
          User_ID: this.username,
          Company_Name: cumpani,
          Invoice_No: invoice,
          Product_Id: null,
          Category_Id: null,
          Purchase_Date: null,
          Quantaty: 0,
          Producut_Price: 0,
          Total_Price: 0,
        }
      )
      this.isReadOnly = true;
    }

    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });


  }

  setName(value: any) {
    if (this.isReadOnly) {
      this.notisevice.warn('Warning', 'Please, Complete This Invoice for Change Suppliyer', {
        animate: 'fromTop'
      })
      this.suppliyername = this.suppliyername;
    } else {
      this.suppliyername = value.Company_Name + "/" + value.Address;
    }

  }

  setCategory(value: any) {
    this.categoryname = null;

    this.categoryname = value.Name;
    this.categoryId = value.id;
    const formData = new FormData();
    formData.append('User_ID', this.username);
    formData.append('Category_Id', value.id);
    this.productSe.getAllProdcutbycategory(formData).subscribe((result) => {
      this.allProduct = result;
      //console.log(this.allProduct)
    })
  }

  setProductname(value: any) {
    this.productname = value.Product_Name;
    this.productId = value.Product_ID;
  }

  setSetAllSuppliyer() {
    const formData = new FormData();
    formData.append('User_ID', this.username);
    this.suppliyer.getAllSuppliyer(formData).subscribe((result) => {
      this.allSuppliyer = result;
      //console.log(this.allSuppliyer)
    })
  }

  setAllcategory() {
    const formData = new FormData();
    formData.append('User_ID', this.username);
    this.categoryser.getAllcategory(formData).subscribe((result) => {
      this.allCategory = result;
      //console.log(this.allCustommer)
    })
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        User_ID: [this.username, Validators.required],
        Company_Name: [null, Validators.required],
        Invoice_No: [null, Validators.required],
        Product_Id: [null, Validators.required],
        Category_Id: [null, Validators.required],
        Purchase_Date: [null, Validators.required],
        Producut_Price: [0, Validators.required],
        Quantaty: [0, Validators.required],
        Total_Price: [0, Validators.required],
      }
    )
  }

  clearForm() {
    this.totalprice = 0;
    this.form.reset(
      {
        User_ID: this.username,
        Company_Name: this.allInvoiceItem[0].Company_Name,
        Invoice_No: this.allInvoiceItem[0].Invoice_No,
        Product_Id: null,
        Category_Id: null,
        Purchase_Date: null,
        Quantaty: 0,
        Producut_Price: 0,
        Total_Price: 0,
      }
    )
    this.categoryname = ''; this.categoryId = '';
    this.productname = ''; this.productId = '';
    this.updateD=false;
  }

  countTotal(event: any) {
    const s: any = this.form.get('Producut_Price')?.value
    if (s != 0) {
      const a = s * event.target.value;
      this.totalprice = a;
    } else {
      this.totalprice = 0;
      console.warn(this.totalprice)
    }

  }

  countTotalp(event: any) {
    const s: any = this.form.get('Quantaty')?.value;
    if (s != 0) {
      const a = s * event.target.value;
      this.totalprice = a;
    } else {
      this.form.reset({
        Total_Price: '0'
      });;
    }
  }


  onSubmit() {
    if (this.validFrom()) {
      const formData = new FormData();
      formData.append('User_ID', this.username);
      formData.append('Company_Name', this.suppliyername);
      formData.append('Invoice_No', this.form.get('Invoice_No')?.value);
      formData.append('Product_Id', this.productId);
      formData.append('checkbill', this.checkbill);
      formData.append('Category_Id', this.categoryId);
      formData.append('Purchase_Date', this.todaydate);
      formData.append('Quantaty', this.form.get('Quantaty')?.value);
      formData.append('Producut_Price', this.form.get('Producut_Price')?.value);
      formData.append('Total_Price', this.totalprice);
      this.productSer.purChaseProduct(formData).subscribe((result: any) => {
        if (result.title == 'Warning') {
          this.notisevice.warn('Warning', result.message, {
            animate: 'fromTop'
          })
        } else {
          this.setInvoice(this.suppliyername, this.form.get('Invoice_No')?.value);
        }
      })
    } else {

    }


  }

  validFrom() {
    if (this.suppliyername != '') {
      if (this.form.controls['Invoice_No'].value) {
        if (this.categoryId != '') {
          if (this.productId != '') {
            if (this.form.controls['Quantaty'].value) {
              if (this.form.controls['Producut_Price'].value) {
                return true;
              } else {
                this.notisevice.warn('Warning', 'Please Enter Producut Price', {
                  animate: 'fromTop'
                })
                return false;
              }
            } else {
              this.notisevice.warn('Warning', 'Please Enter Product Quantaty', {
                animate: 'fromTop'
              })
              return false;
            }

          } else {
            this.notisevice.warn('Warning', 'Please Select Product Id', {
              animate: 'fromTop'
            })
            return false;
          }
        } else {
          this.notisevice.warn('Wrong', 'Please Select Category Id', {
            animate: 'fromTop'
          })
          return false;
        }
      } else {
        this.notisevice.warn('Wrong', 'Please Enter Invoice No', {
          animate: 'fromTop'
        })
        return false;
      }
    } else {
      this.notisevice.warn('Wrong', 'Please Select Suppliyer Name', {
        animate: 'fromTop'
      })
      return false;
    }
  }

  setInvoice(cumpaniname: any, invoiceid: any) {
    this.invoiceNo = invoiceid;
    this.totoalInvoiceItem = 0;
    this.allInvoiceTotal = 0;
    this.isReadOnly = true;
    const invoicedata = new FormData();
    invoicedata.append('User_ID', this.username);
    invoicedata.append('Company_Name', cumpaniname);
    invoicedata.append('Invoice_No', invoiceid);
    this.productSer.allProductInvoice(invoicedata).subscribe((result) => {
      this.allInvoiceItem = result;
      if (this.allInvoiceItem.length == 0) {
        this.checkbill = 'frist'
        this.isReadOnly = false;
        this.allInvoiceItem = null;
      } else {
        for (let i = 0; i != this.allInvoiceItem.length; i++) {
          this.totoalInvoiceItem += 1;
          this.allInvoiceTotal += this.allInvoiceItem[i].Total_Price
        }
        this.checkbill = 'running'
        this.clearForm();
      }
    })
  }

  discount(event: any) {
    //console.warn(event.target.value);
    this.discountAmount = event.target.value
    if (this.paidAmount != 0) {
      this.dueAmount = this.allInvoiceTotal - this.paidAmount - this.discountAmount;
    } else {
      this.dueAmount = this.allInvoiceTotal - event.target.value
    }

  }

  paidAmout(event: any) {
    this.paidAmount = event.target.value
    if (this.discountAmount != 0) {
      this.dueAmount = this.allInvoiceTotal - this.paidAmount - this.discountAmount;
    } else {
      this.dueAmount = this.allInvoiceTotal - event.target.value
    }

  }

  setCosting(event: any) {
    this.costing = event.target.value
    if (this.costing != '') {
      //console.warn(this.costing)
    }

  }

  update() {

    const formData = new FormData();
    formData.append('id', this.updatepid);
    formData.append('User_ID', this.username);
    formData.append('Company_Name', this.form.get('Company_Name')?.value);
    formData.append('Invoice_No', this.form.get('Invoice_No')?.value);
    formData.append('Product_Id', this.productId);
    formData.append('Category_Id', this.categoryId);
    formData.append('Purchase_Date', this.todaydate);
    formData.append('Quantaty', this.form.get('Quantaty')?.value);
    formData.append('Producut_Price', this.form.get('Producut_Price')?.value);
    formData.append('Total_Price', this.totalprice);
    console.warn(formData)
    this.productSer.updateInvoiceItem(formData).subscribe((result:any) => {
      if(result.title=='Warning'){
        console.warn(result.message)
        this.notisevice.warn( result.title, result.message, {
          animate: 'fromTop'
        })
      }else{
        this.notisevice.success( result.title, result.message, {
          animate: 'fromTop'
        })
        this.setInvoice(this.suppliyername, this.form.get('Invoice_No')?.value);
        this.updateD = false;
      }
    
     
    })

  }

  submitInvoice() {
    this.isReadOnly = false;
    if (this.dueAmount == 0) {
      this.dueAmount = this.allInvoiceTotal;
    }
    const formdata = new FormData();
    formdata.append('User_ID', this.username);
    formdata.append('Company_Name', this.suppliyername);
    formdata.append('Invoice_No', this.form.get('Invoice_No')?.value);
    formdata.append('Purchase_Date', this.todaydate);
    formdata.append('Total_Item', this.totoalInvoiceItem);
    formdata.append('Total_Amount', this.allInvoiceTotal);
    formdata.append('Discount', this.discountAmount);
    formdata.append('Paid', this.paidAmount);
    formdata.append('Status', 'Cash');
    this.purchasesAcc.createAcc(formdata).subscribe((resul) => {


      if (this.paidAmount != 0) {
        const purchasescash = new FormData();
        purchasescash.append('User_ID', this.username);
        purchasescash.append('Date', this.todaydate);
        purchasescash.append('Amount', this.paidAmount);
        purchasescash.append('Status', 'Devit');
        purchasescash.append('Details', this.suppliyername + '/' + this.form.get('Invoice_No')?.value + "/Purchases");
        this.cashser.addCash(purchasescash).subscribe((result) => {

        })
      }

      if (this.costing != 0 || this.costing != ' ') {
        const costdata = new FormData();
        costdata.append('User_ID', this.username);
        costdata.append('Date', this.todaydate);
        costdata.append('Amount', this.costing);
        costdata.append('Status', 'Purchases');
        costdata.append('Details', this.suppliyername + '/' + this.form.get('Invoice_No')?.value);
        this.costingser.createCosting(costdata).subscribe((result) => {
          const costforcash = new FormData();
          costforcash.append('User_ID', this.username);
          costforcash.append('Date', this.todaydate);
          costforcash.append('Amount', this.costing);
          costforcash.append('Status', 'Devit');
          costforcash.append('Details', this.suppliyername + '/' + this.invoiceNo + "/Cost");
          this.cashser.addCash(costforcash).subscribe((result) => {
            this.allClear();
          })
        })
      } else {
        this.allClear();
      }

      this.adddata = true;
      this.userdata = "Product Purchases Successfully..."
      // location.reload();

    })
  }

  allClear() {
    this.allInvoiceItem = null;
    this.isReadOnly = false;
    this.suppliyername = '';
    this.totalprice = 0;
    this.form.reset(
      {
        User_ID: this.username,
        Company_Name: null,
        Invoice_No: null,
        Product_Id: null,
        Category_Id: null,
        Purchase_Date: null,
        Quantaty: 0,
        Producut_Price: 0,
        Total_Price: 0,
      }
    )
  }

  deletePFormInvoice(value: any) {
    const formdata = new FormData();
    formdata.append('User_ID', this.username);
    formdata.append('Company_Name', value.Company_Name);
    formdata.append('Invoice_No', value.Invoice_No);
    formdata.append('id', value.id);
    this.productSer.deletePfromInvoice(formdata).subscribe((result:any) => {
      if(result.title=='Warning'){
        this.notisevice.warn( result.title, result.message, {
          animate: 'fromTop'
        })
      }else{
        this.notisevice.success( result.title, result.message, {
          animate: 'fromTop'
        })
          this.setInvoice(value.Company_Name, value.Invoice_No);
      }
    
    })
  }

  setEditData(value: any) {
    console.warn(value)
    this.productname = value.product.Product_Name;
    this.productId = value.Product_Id;
    this.form.reset(
      {
        User_ID: this.username,
        Company_Name: value.Company_Name,
        Invoice_No: value.Invoice_No,
        Product_Id: value.product.Product_Name,
        Category_Id: value.category.Name,
        Purchase_Date: value.Purchase_Date,
        Quantaty: value.Quantaty,
        Producut_Price: value.Producut_Price,
        Total_Price: value.Total_Price,
      }
    )
    this.setCategory(value.category);
    this.totalprice = value.Total_Price;
    this.updatepid = value.id;
    this.updateD = true;
  }

}

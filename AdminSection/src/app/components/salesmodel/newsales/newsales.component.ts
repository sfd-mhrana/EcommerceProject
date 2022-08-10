import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { CustommerService } from 'src/app/services/custommer/custommer.service';
import { ProductserService } from 'src/app/services/product/productser.service';
import { CategoryService } from 'src/app/services/product/category.service';
import { PurchasesserService } from 'src/app/services/purchases/purchasesser.service';
import { EmployeeserService } from 'src/app/services/employee/employeeser.service';
import { SalesserService } from 'src/app/services/sales/salesser.service';
import { AccountsserService } from 'src/app/services/account/accountsser.service';
import { SalesaccserService } from 'src/app/services/sales/salesaccser.service';
import { NotificationsService } from 'angular2-notifications';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-newsales',
  templateUrl: './newsales.component.html',
  styleUrls: ['./newsales.component.css']
})
export class NewsalesComponent implements OnInit {

  username = 'rana'; isReadOnly: boolean = false; updateD: boolean = false;


  custommername: any = '';
  categoryname: any = ''; categoryId: any = '';
  productname: any = ''; productId: any = '';
  SRName: any = ''; SR_ID: any;

  grnumber: any = ''; checkbill: any = 'first';

  refreshactive = new BehaviorSubject<boolean>(true);

  todaydate: any; form: any;

  allProductInvoice: any = null; totalprice: any = 0;

  totoalInvoiceItem: any = 0; allInvoiceTotal: any = 0;


  paidAmount: any = 0; discountAmount: any = 0; dueAmount: any = 0; costing: any = 0;

  allcustommer: any; allCategory: any; allProduct: any; allGRNumber: any; selectedPeoductQuantaty: any;

  allGRNProductDetails: any; allSRArray: any;

  editedGrnQuantaty: any = 0; storeEditedGr: any; updatepid: any = null;

  allInvoiceItem: any = null;

  productimage: any = environment.imageUrl+"productImage/";
  custommerImage: any = environment.imageUrl+"custommerImage/";
  employeeimage =environment.imageUrl+ "employeeImage/"

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private purchaseser: PurchasesserService,
    private custommerser: CustommerService, private productSe: ProductserService, private employeeSer: EmployeeserService,
    private categoryser: CategoryService, private salesSer: SalesserService, private cashser: AccountsserService,
    private salesacc: SalesaccserService, private notisevice: NotificationsService,
  ) {
    var date = new Date();
    this.todaydate = this.datePipe.transform(date, "yyyy-MM-dd");
    this.createForm();
    this.setAllcategory();
    this.setAllCustommer();
    this.setAllSR();
    if (this.salesSer.salesInvoiceNo != null) {
      this.setInvoiceItem(this.salesSer.salesInvoiceNo)
      this.isReadOnly = true;
      console.warn(this.salesSer.salesInvoiceNo)
    }
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.custommername; this.categoryname; this.productname; this.totalprice; this.allInvoiceItem; this.allGRNumber;
      this.isReadOnly; this.todaydate; this.grnumber; this.allInvoiceTotal; this.totoalInvoiceItem; this.dueAmount;
    })

    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }

  setName(value: any) {
    if (this.isReadOnly) {
      this.notisevice.warn('Warning', 'Please, Complete This Invoice for Change Custommer', {
        animate: 'fromTop'
      })
      this.custommername = this.custommername;
    } else {
      this.custommername = null;
      this.custommername = value.Company_Name + "/" + value.Address;
      //console.warn(this.custommername)
    }
  }

  setNotParmanentCumto(value: any) {
    this.custommername = null;
    this.custommername = value.target.value;
    //console.warn(this.custommername)
  }

  setCategory(value: any) {
    this.categoryname = null;
    this.productname = null;
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
    this.setGrnNumber();
  }

  setGrnNumber() {
    this.allGRNumber = null;
    console.warn(this.categoryId)
    console.warn(this.productId)
    const formData = new FormData();
    formData.append('User_ID', this.username);
    formData.append('Category_Id', this.categoryId);
    formData.append('Product_Id', this.productId);
    this.purchaseser.getGRN(formData).subscribe((result) => {
      this.allGRNumber = result;
      console.warn(this.allGRNumber)
      if (this.allGRNumber.length == 0) {
        this.form.controls['GRN_NO'].reset(null);
        this.form.controls['Producut_Price'].reset(0);
        this.form.controls['Quantaty'].reset(0)
      }
    })
  }

  setSrname(value: any) {
    if (this.isReadOnly) {
      this.notisevice.warn('Warning', 'Please, Complete This Invoice for Change Suppliyer', {
        animate: 'fromTop'
      })
    } else {
      this.SRName = value.Employee_Name;
      this.SR_ID = value.Employee_ID;
      // console.warn(this.SR_ID)
    }
  }

  setGrn(value: any) {
    this.grnumber = value.id;
    this.selectedPeoductQuantaty = value.Quantaty;
    this.form.controls['Quantaty'].reset(value.Quantaty)
    const formData = new FormData();
    formData.append('User_ID', this.username);
    formData.append('id', value.id);
    this.purchaseser.allPurProduct(formData).subscribe((result) => {
      this.allGRNProductDetails = result;
      this.form.controls['Producut_Price'].reset(this.allGRNProductDetails[0].Producut_Price)
      this.totalprice=value.Quantaty*this.allGRNProductDetails[0].Producut_Price;
    })
  }

  createForm() {
    this.form = this.formBuilder.group(
      { 
        User_ID: [this.username, Validators.required],
        Company_Name: [null, Validators.required],
        Invoice_No: [null, Validators.required],
        Category_Id: [null, Validators.required],
        Product_Id: [null, Validators.required],
        GRN_NO: [null, Validators.required],
        Sales_Date: [null, Validators.required],
        Producut_Price: [0, Validators.required],
        Quantaty: [0, Validators.required],
        Total_Price: [0, Validators.required],
        SR_ID: [null, Validators.required],
      }
    )
  }

  setAllcategory() {
    const formDatac = new FormData();
    formDatac.append('User_ID', this.username);
    this.categoryser.getAllcategory(formDatac).subscribe((result) => {
      this.allCategory = result;
      //console.warn(result)
    })
  }

  setAllCustommer() {
    const formData = new FormData();
    formData.append('User_ID', this.username);
    this.custommerser.getAllCustommer(formData).subscribe((result) => {
      this.allcustommer = result;
      //console.log(this.allcustommer)
    })
  }

  setAllSR() {
    const formData = new FormData();
    formData.append('User_ID', this.username);
    formData.append('SR', 'SR');
    this.employeeSer.getallEmployee(formData).subscribe((result) => {
      this.allSRArray = result;
      // console.log(this.allSRArray)
    })
  }

  clearForm() {
    this.totalprice = 0;
    console.warn(this.allInvoiceItem[0])
    this.form.reset(
      {
        User_ID: this.username,
        Company_Name: this.allInvoiceItem[0].Company_Name,
        Invoice_No: this.allInvoiceItem[0].Invoice_No,
        Category_Id: null,
        Product_Id: null,
        GRN_NO: null,
        Sales_Date: null,
        Producut_Price: 0,
        Quantaty: 0,
        Total_Price: 0,
        SR_ID: this.allInvoiceItem[0].employee.Employee_Name,
      }
    )
    this.SR_ID = this.allInvoiceItem[0].employee.Employee_ID
    this.categoryname = ''; this.categoryId = '';
    this.productname = ''; this.productId = '';
  }

  countTotal(event: any) {
    const s: any = this.form.get('Producut_Price')?.value
    if (s != 0) {
      const a = s * event.target.value;
      this.totalprice = a;
    } else {
      this.totalprice = 0;
      // console.warn(this.totalprice)
    }

  }

  countTotalp(event: any) {
    const s: any = this.form.get('Quantaty')?.value;
    if (s != 0) {
      const a = s * event.target.value;
      this.totalprice = a;
    } else {
      this.totalprice = 0;
    }
  }

  onSubmit() {
    if (this.validFrom()) {
      if (parseInt(this.form.get('Quantaty')?.value) > this.selectedPeoductQuantaty) {
        alert("Please, Select Quantaty Less Than " + this.selectedPeoductQuantaty)
      } else {
        const formData = new FormData();
        formData.append('User_ID', this.username);
        formData.append('Company_Name', this.custommername);
        formData.append('Invoice_No', this.form.get('Invoice_No')?.value);
        formData.append('Product_Id', this.productId);
        formData.append('Category_Id', this.categoryId);
        formData.append('checkbill', this.checkbill);
        formData.append('GRN', this.grnumber);
        formData.append('Sales_Date', this.todaydate);
        formData.append('Quantaty', this.form.get('Quantaty')?.value);
        formData.append('Sales_Price', this.form.get('Producut_Price')?.value);
        formData.append('Total_Price', this.totalprice);
        formData.append('SR_ID', this.SR_ID);
        this.salesSer.salesProduct(formData).subscribe((result: any) => {
          if (result.title == 'Warning') {
            this.notisevice.warn('Warning', result.message, {
              animate: 'fromTop'
            })
          } else {
            this.setInvoiceItem(this.form.get('Invoice_No')?.value);
            this.isReadOnly = true;
          }

        });
      }
    } else {

    }

  }
  validFrom() {

    if (this.custommername != '') {
      if (this.form.controls['Invoice_No'].value) {
        if (this.productId != '') {
          if (this.categoryId != '') {
            if (this.grnumber != '') {
              if (this.form.controls['Quantaty'].value) {
                if (this.form.controls['Producut_Price'].value) {
                  if(this.SR_ID){
                     return true;
                  }else{
                    this.notisevice.warn('Warning', 'Please Select SR', {
                      animate: 'fromTop'
                    })
                    return false;
                  }
                 
                } else {
                  this.notisevice.warn('Warning', 'Please Enter Product Price', {
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
              this.notisevice.warn('Warning', 'Please Select Product grnumber', {
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
          this.notisevice.warn('Wrong', 'Please Select Product Name', {
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
      this.notisevice.warn('Wrong', 'Please Select Or Enter Custommer Name', {
        animate: 'fromTop'
      })
      return false;
    }

  }

  setInvoiceItem(invoice: any) {
    this.totoalInvoiceItem=0;
    this.allInvoiceTotal = 0;
    const formData = new FormData();
    formData.append('User_ID', this.username);
    formData.append('Invoice_No', invoice);
    this.salesSer.getInvoiceSalesItem(formData).subscribe((result) => {
      this.checkbill = 'running';
      this.allInvoiceItem = result;
      if (this.allInvoiceItem.length == 0) {
        this.isReadOnly = false;
        this.allInvoiceItem = null;
        this.checkbill='first'
      } else {
        this.custommername = this.allInvoiceItem[0].Company_Name;
        for (let i = 0; i != this.allInvoiceItem.length; i++) {
          this.totoalInvoiceItem += 1;
          this.allInvoiceTotal += this.allInvoiceItem[i].Total_Price
          this.dueAmount = this.allInvoiceTotal;
        }
        this.clearForm();
      }
    });
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

  submitInvoice() {
    this.isReadOnly = false;
    if (this.dueAmount == 0) {
      this.dueAmount = this.allInvoiceTotal;
    }
    const formdata = new FormData();
    formdata.append('User_ID', this.username);
    formdata.append('Company_Name', this.custommername);
    formdata.append('Invoice_No', this.form.get('Invoice_No')?.value);
    formdata.append('Sales_Date', this.todaydate);
    formdata.append('Total_Item', this.totoalInvoiceItem);
    formdata.append('Total_Amount', this.allInvoiceTotal);
    formdata.append('Discount', this.discountAmount);
    formdata.append('Paid', this.paidAmount);
    formdata.append('SR_ID', this.SR_ID);
    formdata.append('Status', 'Cash');
    this.salesacc.createsalesAcc(formdata).subscribe((resul) => {
      if (this.paidAmount != 0) {
        const purchasescash = new FormData();
        purchasescash.append('User_ID', this.username);
        purchasescash.append('Date', this.todaydate);
        purchasescash.append('Amount', this.paidAmount);
        purchasescash.append('Status', 'Credit');
        purchasescash.append('Details', this.custommername + '/' + this.form.get('Invoice_No')?.value + "/Sales");
        this.cashser.addCash(purchasescash).subscribe((result) => {
          this.allClear()
        })
      }
      this.allClear()

    })
  }

  allClear() {
    this.allInvoiceItem = null;
    this.isReadOnly = false;
    this.totalprice = 0;
    this.form.reset(
      {
        User_ID: this.username,
        Company_Name: null,
        Invoice_No: null,
        Category_Id: null,
        Product_Id: null,
        GRN_NO: null,
        Sales_Date: null,
        Producut_Price: 0,
        Quantaty: 0,
        Total_Price: 0,
        SR_ID: null,
      }
    )
    this.custommername = null;
    this.allProduct = null;
    this.productId = null;
    this.allGRNumber = null;
    this.grnumber = null;
    this.SR_ID = null;
    this.SRName = null;
    this.salesSer.salesInvoiceNo = null;
  }

  setEditData(value: any) {
    //console.warn(value)
    this.updatepid = value.id;
    this.storeEditedGr = value.GRN;
    this.setCategory(value.category);
    this.productname = value.product.Product_Name;
    this.productId = value.Product_Id;
    this.form.reset(
      {
        User_ID: this.username,
        Company_Name: value.Company_Name,
        Invoice_No: value.Invoice_No,
        Product_Id: value.product.Product_Name,
        Category_Id: value.category.Name,
        GRN_NO: value.GRN,
        Purchase_Date: value.Purchase_Date,
        Quantaty: value.Quantaty,
        Producut_Price: value.Sales_Price,
        Total_Price: value.Total_Price,
        SR_ID: value.employee.Employee_Name
      }
    )
    this.SR_ID = value.employee.Employee_ID
    this.SRName = value.employee.Employee_Name
    this.totalprice = value.Total_Price;
    this.updateD = true;
    this.editedGrnQuantaty = value.Quantaty;

    this.setGrnNumber();
    this.grnumber = value.GRN;

    //console.warn(this.editedGrnQuantaty)
  }

  deletePFormInvoice(value: any) {
    const formdata = new FormData();
    formdata.append('User_ID', this.username);
    formdata.append('Invoice_No', value.Invoice_No);
    formdata.append('id', value.id);
    this.salesSer.deletePfromInvoice(formdata).subscribe((resula) => {
      this.setInvoiceItem(value.Invoice_No);
    })
  }

  update() {


    if (this.allGRNumber != null) {
      if (this.allGRNumber.length != 0) {
        this.allGRNumber.map((item: any) => {
          if (item.id == this.grnumber) {
            this.editedGrnQuantaty = this.editedGrnQuantaty + parseInt(item.Quantaty)
            //alert(this.editedGrnQuantaty)
          }
        })
      }
    }

    if (this.grnumber == this.storeEditedGr) {

      if (parseInt(this.form.get('Quantaty')?.value) > this.editedGrnQuantaty) {
        alert("Please, Select Quantaty Less Than " + this.editedGrnQuantaty)
      } else {
        const formData = new FormData();
        formData.append('id', this.updatepid);
        formData.append('User_ID', this.username);
        formData.append('Company_Name', this.custommername);
        formData.append('Invoice_No', this.form.get('Invoice_No')?.value);
        formData.append('Product_Id', this.productId);
        formData.append('Category_Id', this.categoryId);
        formData.append('GRN', this.grnumber);
        formData.append('Sales_Date', this.todaydate);
        formData.append('Quantaty', this.form.get('Quantaty')?.value);
        formData.append('Sales_Price', this.form.get('Producut_Price')?.value);
        formData.append('Total_Price', this.totalprice);
        formData.append('SR_ID', this.SR_ID);

        // console.warn(formData)
        this.salesSer.updatesalesItem(formData).subscribe((result) => {
          this.setInvoiceItem(this.form.get('Invoice_No')?.value);
          this.updateD = false;
        })
      }
    } else {
      if (parseInt(this.form.get('Quantaty')?.value) > this.selectedPeoductQuantaty) {
        alert("Please, Select Quantaty Less Than " + this.selectedPeoductQuantaty)
      } else {
        const formData = new FormData();
        formData.append('id', this.updatepid);
        formData.append('User_ID', this.username);
        formData.append('Company_Name', this.custommername);
        formData.append('Invoice_No', this.form.get('Invoice_No')?.value);
        formData.append('Product_Id', this.productId);
        formData.append('Category_Id', this.categoryId);
        formData.append('GRN', this.grnumber);
        formData.append('Sales_Date', this.todaydate);
        formData.append('Quantaty', this.form.get('Quantaty')?.value);
        formData.append('Sales_Price', this.form.get('Producut_Price')?.value);
        formData.append('Total_Price', this.totalprice);
        formData.append('SR_ID', this.SR_ID);

        // console.warn(formData)
        this.salesSer.updatesalesItem(formData).subscribe((result) => {
          this.setInvoiceItem(this.form.get('Invoice_No')?.value);
          this.updateD = false;
        })
      }
    }
  }

}

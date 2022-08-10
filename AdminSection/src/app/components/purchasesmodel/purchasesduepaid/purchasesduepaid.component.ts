import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import * as $ from 'jquery';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { PurchasesserService } from '../../../services/purchases/purchasesser.service';
import { PurchasesaccService } from 'src/app/services/purchases/purchasesacc.service';
import { AccountsserService } from 'src/app/services/account/accountsser.service';
import { SuppliyerService } from 'src/app/services/suppliyer/suppliyer.service';
import { CostingserService } from 'src/app/services/account/costingser.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-purchasesduepaid',
  templateUrl: './purchasesduepaid.component.html',
  styleUrls: ['./purchasesduepaid.component.css']
})
export class PurchasesduepaidComponent implements OnInit {

  username: any = 'rana'; ifallPaid: boolean = false; updateD: boolean = false;

  //Design Section
  suppliyername: any = ''; invoiceno: string = ''; tableItem: any;
  refreshactive = new BehaviorSubject<boolean>(true);

  allSuppliyer: any = null; todaydate: any; allInvoiceAcc: any;

  editLastDue: any = 0; editId: any = null; editdate: any = null; editPaidAmount: any = null;

  totalInvoice: number = 0; totalAmount: any = 0; totalDue: any = 0; singleinvoiceshow: boolean = false;

  discountAmount: any = 0; paidAmount: any = 0; lastDue: any = 0; costing: any = 0; stepbysteppaid: number = 0;

  form: any;
  isReadOnly: boolean = false;
  suppliyeriamge: any = environment.imageUrl+"suppliyerImage/";

  constructor(private purchasesacc: PurchasesaccService, private productSer: PurchasesserService, private datePipe: DatePipe,
    private formBuilder: FormBuilder, private cashser: AccountsserService, private costingser: CostingserService, private suppliyer: SuppliyerService, private notisevice: NotificationsService,
  ) {
    var date = new Date();
    this.todaydate = this.datePipe.transform(date, "yyyy-MM-dd");
    this.setSetAllSuppliyer();
    this.createForm();
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.suppliyername; this.invoiceno; this.allInvoiceAcc; this.allSuppliyer; this.tableItem; this.totalDue;
      this.updateD;
    })

    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
  }

  setInvioceItem(value: any) {
    this.suppliyername = value.Company_Name + "/" + value.Address;
    this.getAllbillBySuppliyer(this.suppliyername)
  }

  setInvoice(value: any) {
    this.invoiceno = value.Invoice_No;
    this.getTranjectionBybill(this.invoiceno);
  }

  setSetAllSuppliyer() {
    const formData = new FormData();
    formData.append('User_ID', this.username);
    this.suppliyer.getAllSuppliyer(formData).subscribe((result) => {
      this.allSuppliyer = result;
      //console.log(this.allSuppliyer)
    })
  }

  getAllbillBySuppliyer(cumpanyname: any) {
    this.totalAmount = 0;
    this.totalDue = 0;
    const formData = new FormData();
    formData.append('User_ID', this.username);
    formData.append('Company_Name', cumpanyname);
    this.purchasesacc.getAllbillByCustommer(formData).subscribe((result) => {
      this.allInvoiceAcc = result;
      this.tableItem = result;
      for (let i = 0; i != this.tableItem.length; i++) {
        this.totalAmount += parseInt(this.tableItem[i].Total_Amount);
        this.totalDue += this.tableItem[i].Total_Amount - this.tableItem[i].Paid - this.tableItem[i].Discount
      }
      this.ifallPaid = false;
      this.totalInvoice = this.allInvoiceAcc.length;
      //  console.warn(this.tableItem)
      this.singleinvoiceshow = false;
    })
  }

  getTranjectionBybill(bill: any) {
    this.totalAmount = 0;
    this.totalDue = 0;
    const formDatai = new FormData();
    formDatai.append('User_ID', this.username);
    formDatai.append('Company_Name', this.suppliyername);
    formDatai.append('Invoice_No', bill);
    this.purchasesacc.getSingleInvoiceItem(formDatai).subscribe((result) => {
      this.tableItem = result;
      for (let i = 0; i != this.tableItem.length; i++) {
        this.totalAmount += parseInt(this.tableItem[i].Total_Amount);
        this.totalDue += this.tableItem[i].Total_Amount - this.tableItem[i].Paid - this.tableItem[i].Discount
      }
      this.totalInvoice = this.tableItem.length;
      if (this.totalDue == 0) {
        this.ifallPaid = true;
      }
      this.lastDue = this.totalDue;
      this.singleinvoiceshow = true;
      //console.warn(this.tableItem)
    })
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        User_ID: [this.username, Validators.required],
        Company_Name: [null, Validators.required],
        Invoice_No: [null, Validators.required],
        Total_Amount: [0, Validators.required],
        Paid: [0, Validators.required],
        Total_Item: [0, Validators.required],
        Purchase_Date: [this.todaydate, Validators.required],
        Due_Amount: [0, Validators.required],
        Discount: [0, Validators.required],
        Cost: [0, Validators.required],
        Status: ['DuePaid', Validators.required],
      }
    )
  }

  discount(event: any) {
    this.discountAmount = 0;
    this.lastDue = 0;
    //console.warn(event.target.value);
    if (this.updateD) {
      this.discountAmount = event.target.value
      if (this.paidAmount != 0) {
        this.lastDue = this.editLastDue - this.paidAmount - this.discountAmount;
      } else {
        this.lastDue = this.editLastDue - event.target.value
      }
    } else {
      this.discountAmount = event.target.value
      if (this.paidAmount != 0) {
        this.lastDue = this.totalDue - this.paidAmount - this.discountAmount;
      } else {
        this.lastDue = this.totalDue - event.target.value
      }
    }


  }

  paidAmout(event: any) {
    this.paidAmount = 0;
    this.lastDue = 0;
    if (this.updateD) {
      this.paidAmount = event.target.value
      if (this.discountAmount != 0) {
        this.lastDue = this.editLastDue - this.paidAmount - this.discountAmount;
      } else {
        this.lastDue = this.editLastDue - event.target.value
      }
    } else {
      this.paidAmount = event.target.value
      if (this.discountAmount != 0) {
        this.lastDue = this.totalDue - this.paidAmount - this.discountAmount;
      } else {
        this.lastDue = this.totalDue - event.target.value
      }
    }

  }

  setCost(event: any) {
    this.costing = event.target.value
  }

  submitDuepaid() {

    if (this.validFrom()) {

      if (this.lastDue == 0) {
        this.lastDue = this.totalDue;
      }

      const formdata = new FormData();
      formdata.append('User_ID', this.username);
      formdata.append('Company_Name', this.suppliyername);
      formdata.append('Invoice_No', this.invoiceno);
      formdata.append('Purchase_Date', this.todaydate);
      formdata.append('Total_Item', '0');
      formdata.append('Total_Amount', '0');
      formdata.append('Discount', this.discountAmount);
      formdata.append('Paid', this.paidAmount);
      formdata.append('Status', 'Cash');
      this.purchasesacc.createAcc(formdata).subscribe((resul) => {


        if (this.paidAmount != 0) {
          const purchasescash = new FormData();
          purchasescash.append('User_ID', this.username);
          purchasescash.append('Date', this.todaydate);
          purchasescash.append('Amount', this.paidAmount);
          purchasescash.append('Status', 'Devit');
          purchasescash.append('Details', this.suppliyername + '/' + this.invoiceno + "/Purchases");
          this.cashser.addCash(purchasescash).subscribe((result) => {

          })
        }


        if (this.costing != 0 || this.costing != ' ') {
          const costdata = new FormData();
          costdata.append('User_ID', this.username);
          costdata.append('Date', this.todaydate);
          costdata.append('Amount', this.costing);
          costdata.append('Status', 'Purchases');
          costdata.append('Details', this.suppliyername + '/' + this.invoiceno);
          this.costingser.createCosting(costdata).subscribe((result) => {
            const costforcash = new FormData();
            costforcash.append('User_ID', this.username);
            costforcash.append('Date', this.todaydate);
            costforcash.append('Amount', this.costing);
            costforcash.append('Status', 'Devit');
            costforcash.append('Details', this.suppliyername + '/' + this.invoiceno + "/Cost");
            this.cashser.addCash(costforcash).subscribe((result) => {
              this.getTranjectionBybill(this.invoiceno);
              this.clearForm();
            })
          })
        } else {
          this.getTranjectionBybill(this.invoiceno);
          this.clearForm();
        }
      })
    } else {
    }
    
  }

  validFrom() {
    if (this.suppliyername != '') {
      if (this.invoiceno != '') {
        return true;
      } else {
        this.notisevice.warn('Wrong', 'Please Select Invoice No', {
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


  upDateDuePaid() {

    if (this.lastDue == 0) {
      this.lastDue = this.totalDue;
    }

    const formdata = new FormData();
    formdata.append('id', this.editId);
    formdata.append('User_ID', this.username);
    formdata.append('Company_Name', this.suppliyername);
    formdata.append('Invoice_No', this.invoiceno);
    formdata.append('Purchase_Date', this.editdate);
    formdata.append('Total_Item', '0');
    formdata.append('Total_Amount', '0');
    formdata.append('Discount', this.discountAmount);
    formdata.append('Paid', this.paidAmount);

    if (this.editPaidAmount > this.paidAmount) {
      this.editPaidAmount = this.editPaidAmount - this.paidAmount;
      formdata.append('Status', 'Credit');
    } else if (this.editPaidAmount < this.paidAmount) {
      this.editPaidAmount = this.paidAmount - this.editPaidAmount;
      formdata.append('Status', 'Devit');
    }
    formdata.append('Amount', this.editPaidAmount);
    formdata.append('Date', this.todaydate);
    this.purchasesacc.updatePurchasesAcc(formdata).subscribe((resul) => {
      this.getTranjectionBybill(this.invoiceno);
      this.clearForm();
      this.updateD = false;
    })
  }

  setEditData(value: any) {
    this.editLastDue = 0;
    //console.warn(value)
    this.form.reset(
      {
        User_ID: this.username,
        Company_Name: this.suppliyername,
        Invoice_No: this.invoiceno,
        Total_Item: 0,
        Paid: value.Paid,
        Discount: value.Discount,
      }
    )
    this.paidAmount = value.Paid;
    this.editPaidAmount = value.Paid;
    this.discountAmount = value.Discount;
    this.editId = value.id;
    this.editdate = value.Purchase_Date;
    this.editLastDue = this.totalDue + value.Paid + value.Discount
    this.updateD = true;
  }

  deletePurAcc(value: any) {

    const formdata = new FormData();


    formdata.append('id', value.id);
    formdata.append('User_ID', this.username);
    formdata.append('Company_Name', this.suppliyername);
    formdata.append('Invoice_No', this.invoiceno);
    formdata.append('Purchase_Date', value.Purchase_Date);
    formdata.append('Total_Item', '0');
    formdata.append('Total_Amount', '0');
    formdata.append('Discount', value.Discount);
    formdata.append('Paid', value.Paid);
    formdata.append('Amount', value.Paid);
    formdata.append('Status', 'Credit');
    formdata.append('Date', this.todaydate);
    this.purchasesacc.deleteInvoiceAcc(formdata).subscribe((resul) => {
      this.getTranjectionBybill(this.invoiceno);
      this.clearForm();
    })
  }

  clearForm() {
    this.form.reset(
      {
        User_ID: this.username,
        Company_Name: this.suppliyername,
        Invoice_No: this.invoiceno,
        Total_Amount: null,
        Total_Item: 0,
        Purchase_Date: null,
        Paid: 0,
        Producut_Price: 0,
        Discount: 0,
      }
    )
    this.setSetAllSuppliyer();
    this.costing = 0;
    this.lastDue = 0;
  }

}

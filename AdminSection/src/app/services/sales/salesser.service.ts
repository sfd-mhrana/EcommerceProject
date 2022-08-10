import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from 'rxjs'
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SalesserService {

  public salesInvoiceNo:any=null;

  private url = environment.serverURL;
  public singleCustomer:any=null;
  private  _listner=new Subject<any>();
  listen():any{
    return this._listner;
  }
  constructor(private http: HttpClient,private cookeiset:CookieService) { }

  salesProduct(value:any){
    return this.http.post(this.url + 'newSales', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  getInvoiceSalesItem(value:any){
    return this.http.post(this.url + 'salesinvoiceProduct', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  deletePfromInvoice(value:any){
    return this.http.post(this.url + 'deletePFormsalesInvoi', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  updatesalesItem(value:any){
    return this.http.post(this.url + 'updateSalesInvoiceItem', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  getAllCustommer(value:any){
    return this.http.post(this.url + 'getallsalesCustommer', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  getAllProductGroupByInvoice(value:any){
    return this.http.post(this.url + 'getproductgroupbyinvoice', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  getNonImportInvoice(value:any){
    return this.http.post(this.url + 'salesnonInpuAcc', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  returnproduct(value:any){
    return this.http.post(this.url + 'salesreturn', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

}

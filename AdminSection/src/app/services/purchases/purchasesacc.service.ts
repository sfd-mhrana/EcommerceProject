import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from 'rxjs'
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PurchasesaccService {
  public setEditBillItem:any=null;

  private url = environment.serverURL;
  public singleCustomer:any=null;
  private  _listner=new Subject<any>();

  listen():any{
    return this._listner;
  }
  constructor(private http: HttpClient,private cookeiset:CookieService) {
  }

  createAcc(value:any) {
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'cproductacc',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }
 
  getAllbillByCustommer(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'purchsesAccAll',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }
  
  getSingleInvoiceItem(value:any){

    let headers = new Headers({ 'Content-Type': 'application/json' });
      

    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'getSingleInvoiceAcc',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

  updatePurchasesAcc(value:any)
  {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'updateInvoiceAcc',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))

  }

  deleteInvoiceAcc(value:any)
  {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'delectInvoiceACC',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))

  }

  nonSubmitBill(value:any)
  {
    
    return this.http.post(this.url + 'nonInpuAcc',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))

  }

  getAllPurchasesAcc(value:any){

    return this.http.post(this.url + 'purchsesAccAll',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

}

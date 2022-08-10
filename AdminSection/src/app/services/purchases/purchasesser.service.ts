import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from 'rxjs'
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PurchasesserService {

  private url = environment.serverURL;
  public singleCustomer:any=null;
  private  _listner=new Subject<any>();

  
  
  listen():any{
    return this._listner;
  }
  constructor(private http: HttpClient,private cookeiset:CookieService) { }


  purChaseProduct(value:any){
    return this.http.post(this.url + 'purchases', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }
 
  allProductInvoice(value:any){
    return this.http.post(this.url + 'invoiceProduct', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  deletePfromInvoice(value:any){
    return this.http.post(this.url + 'deletePFormInvoi',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  updateInvoiceItem(value:any){
    return this.http.post(this.url + 'updateInvoiceItem',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  allPurProduct(value:any){
    return this.http.post(this.url + 'getAllPurProduct',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  getGRN(value:any){
    return this.http.post(this.url + 'provicedGRN',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  returnproduct(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'purchasesreturn',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
   
  }

}

import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from 'rxjs'
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SalesaccserService {

  private url = environment.serverURL;

  public singleCustomer:any=null;

  private  _listner=new Subject<any>();
  listen():any{
    return this._listner;
  }
  constructor(private http:HttpClient,private cookeiset:CookieService) { } 

  createsalesAcc(value:any){
    return this.http.post(this.url + 'csalestacc', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  getAllInvoiceacc(value:any){
    return this.http.post(this.url + 'salesAccAll', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  getSingleInvoiceacc(value:any){
    return this.http.post(this.url + 'getsalesSingleInvoiceAcc', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }
  updateInvoiceItem(value:any){
    return this.http.post(this.url + 'updatesalesInvoiceAcc', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }
  deleteInvoiceAccItem(value:any){
    return this.http.post(this.url + 'delectsalesInvoiceACC', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

}

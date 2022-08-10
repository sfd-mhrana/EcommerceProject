import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from 'rxjs'
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private url = environment.serverURL;
  public singleCustomer:any=null;
  private  _listner=new Subject<any>();
  listen():any{
    return this._listner;
  }
  constructor(private http: HttpClient,private cookeiset:CookieService) { } 

  getALlStockList(value:any){
    return this.http.post(this.url + 'getStock', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  getALlStockAmountList(value:any){
    return this.http.post(this.url + 'stockAmount', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }
}

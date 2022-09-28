import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from 'rxjs'
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AccountsserService {

  private url = environment.serverURL;
  public singleCustomer:any=null;
  private  _listner=new Subject<any>();

  listen():any{
    return this._listner;
  }
  
  constructor(private http: HttpClient,private cookeiset:CookieService) {
  } 
 
  addCash(value:any){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Authorization': `Bearer ${this.cookeiset.get('Token')}`,
        'userid':'1'
      })
    };
    return this.http.post(this.url + 'cash',value,
      httpOptions
    ).pipe(tap(()=>{
      this.listen().next();
    }))
  }


  getAllCashData(value:any){
    return this.http.post(this.url + 'getCashData',value, {
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

  getAccounting(value:any){
    
    return this.http.post(this.url + 'getAccount',value, {
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

}

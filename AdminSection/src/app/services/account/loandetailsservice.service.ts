import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from 'rxjs'
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class LoandetailsserviceService {
  private url = environment.serverURL;
  private  _listner=new Subject<any>();
  listen():any{
    return this._listner;
  }
  
  constructor(private http: HttpClient,private cookeiset:CookieService) { }

  getAllLoanTranjection(value:any){
    
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'getAllLoanTranjection',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))

  }

  newLoan(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'storeNewLoan',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

  deleteInvoiceTransjection(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'deleteLoan',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

  updateLoan(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'upDateLoanDetails',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }
}

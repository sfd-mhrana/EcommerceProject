import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from 'rxjs'
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class InvestingserService {
  private url = environment.serverURL;
  private  _listner=new Subject<any>();
  listen():any{
    return this._listner;
  }
  
  constructor(private http: HttpClient,private cookeiset:CookieService) { }

  getAllinvestingDetails(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'getAllInvestingDetails',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

  createNewInvesting(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'storeNewInvest',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }
  deleteInvesting(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'deleteInvest',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

}

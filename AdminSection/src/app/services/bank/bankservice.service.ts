import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from 'rxjs'
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BankserviceService {

  private url = environment.serverURL;
  public singleCustomer:any=null;
  private  _listner=new Subject<any>();

  listen():any{
    return this._listner;
  }
  constructor(private http: HttpClient,private cookeiset:CookieService) {
  } 

  addnewbank(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'storeanewbank',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }
  getallbank(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'getallbank',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }
  updatebank(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'updatebankinfo',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }
  deletebank(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'deletebank',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }
  getallbankacc(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'getbankAcc',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }
}

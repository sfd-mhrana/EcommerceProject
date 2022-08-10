import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from 'rxjs'
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
}) 
export class CustommerService {
  private url = environment.serverURL;
  public singleCustomer:any=null;
  private  _listner=new Subject<any>();

  listen():any{
    return this._listner;
  }
  constructor(private http: HttpClient,private cookeiset:CookieService) {
  }

  getAllCustommer(value:any) {
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'gcustommer',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
     
    }))
  }

  
  createCustommer(value: any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'custommer', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

  detelecustommer(pid:any){
    const httpHader=new HttpHeaders();
        return this.http.post(this.url + 'deletecustommer',pid,{
          headers:new HttpHeaders()
          .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
        }).pipe(tap( ()=>{
              this.listen().next();
      }))
  }
  updateCustommer(value:any){
   const httpHader=new HttpHeaders();
   return this.http.post(this.url + 'updatecustommer',value,{
    headers:new HttpHeaders()
    .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
  }).pipe(tap( ()=>{
        this.listen().next();
      }))
  }
  
  getcustommerpayments(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'custommerPreport',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap( ()=>{
         this.listen().next();
       }))
  }
 

}

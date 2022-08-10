import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from 'rxjs' 
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SuppliyerService {
  private url = environment.serverURL;
  public singleCustomer:any=null;
  private  _listner=new Subject<any>();

  listen():any{
    return this._listner;
  } 
  
  constructor(private http: HttpClient,private cookeiset:CookieService) {
  }
 
  getAllSuppliyer(value:any) {
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'gsuppliyer',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
    }))
  }
  
  createSuppliyer(value: any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'suppliyer', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

  deteleSuppliyer(pid:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'suppliyerdelete', pid,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
    
  }

  updateSuppliyer(value:any){
   const httpHader=new HttpHeaders();
   return this.http.post(this.url + 'updatesuppliyer',value,{
    headers:new HttpHeaders()
    .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
  }).pipe(tap( ()=>{
        this.listen().next();
      }))
  }
  
  getsuppliyerpayments(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'suppliyerPreport',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap( ()=>{
         this.listen().next();
       }))
  }
 
}
 
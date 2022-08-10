import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from 'rxjs'
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeserService {
  private url = environment.serverURL;
  public singleCustomer:any=null;
  private  _listner=new Subject<any>();
  listen():any{
    return this._listner;
  }

  constructor(private http: HttpClient,private cookeiset:CookieService) { }

  
  getallEmployee(value:any) {
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'gemployee',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
    }))
  }
  
  createEmployee(value: any){ 
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'employee', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

  deleteEmployee(pid:any){
    return  this.http.delete(this.url + 'employee/' + pid,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

  updateEmployee(value:any){
   const httpHader=new HttpHeaders();
   return this.http.post(this.url + 'updateemployee',value,{
    headers:new HttpHeaders()
    .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
  }).pipe(tap( ()=>{
        this.listen().next();
      }))
  }

  getAllEmplyeeTranjction(value:any){
    const httpHader=new HttpHeaders();
   return this.http.post(this.url + 'gemployee',value,{
    headers:new HttpHeaders()
    .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
  }).pipe(tap( ()=>{
        this.listen().next();
      }))
  }

}

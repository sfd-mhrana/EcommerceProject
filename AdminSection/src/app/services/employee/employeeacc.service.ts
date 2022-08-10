import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from 'rxjs'
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeaccService {
  private url = environment.serverURL;
  private  _listner=new Subject<any>();

  listen():any{
    return this._listner;
  }
  constructor(private http: HttpClient,private cookeiset:CookieService) {
  }

  getallEmployee(value:any) {
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'gemployee',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
    }))
  }

  getSelectedEmployee(value:any) {
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'selectedEmploe',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
    }))
  }

  getallEmployeeAcc(value:any) {
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'gemployeeacc',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
    }))
  }

  
  createEmployeeACC(value: any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'employeeacc', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

  deleteEmployee(pid:any){
    return  this.http.post(this.url + 'demployeeacc',pid,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }
  updateEmployee(value:any){
   const httpHader=new HttpHeaders();
   return this.http.post(this.url + 'updateemployeeacc',value,{
    headers:new HttpHeaders()
    .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
  }).pipe(tap( ()=>{
        this.listen().next();
      }))
  }

  
}
 
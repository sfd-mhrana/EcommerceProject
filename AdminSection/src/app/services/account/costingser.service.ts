import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from 'rxjs'
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CostingserService {
  private url = environment.serverURL;
  private  _listner=new Subject<any>();
  listen():any{
    return this._listner;
  }
  
  constructor(private http: HttpClient,private cookeiset:CookieService) { }

  getAllCosting(value:any){
    return this.http.post(this.url + 'getAllCostTranjection',value, {
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

  createCosting(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'storeNewCost',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

  updateCosting(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'upDateCostDetails',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }


  deleteCosting(value:any){
    const httpHader=new HttpHeaders();
    return this.http.post(this.url + 'deleteCost',value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }
}

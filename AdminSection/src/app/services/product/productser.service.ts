import { Injectable } from '@angular/core';
import {tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
}) 
export class ProductserService {
  private url = environment.serverURL;
  private  _listner=new Subject<any>();

  listen():any{
    return this._listner;
  }
  constructor(private http: HttpClient,private cookeiset:CookieService){
  }

  
  getAllProdcut(value:any){
    return this.http.post(this.url + 'gproducts', value,
    {
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
    }));
  }

  createProduct(value: any){
   
    return this.http.post(this.url + 'products', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

  deleteProduct(pid:any){
    return this.http.post(this.url + 'productdelete', pid,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

  getcombocategory(uid:any){
    return  this.http.get(this.url + 'products/create' + uid,
    {
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

  updateProduct(value:any){
   return this.http.post(this.url + 'updateProduct',value,{
    headers:new HttpHeaders()
    .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
  }).pipe(tap( ()=>{
        this.listen().next();
      }))
  }
  
  getAllProdcutbycategory(value:any){
    return this.http.post(this.url + 'gproducts', value,
    {
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
    }));
  }
}
 
import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from 'rxjs'
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = environment.serverURL;

  private  _listner=new Subject<any>();

  listen():any{
    return this._listner;
  }
  constructor(private http: HttpClient,private cookeiset:CookieService) { }
  
  createCategory(value: any){
    return this.http.post(this.url + 'createCategory', value,
    {
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }
  
  getAllcategory(value:any) {
    return this.http.post(this.url + 'allcategory', value,
    {
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
    }))
  }

  deleteCategory(id: number) {
   return  this.http.post(this.url + 'deletecategory',id,
   {
    headers:new HttpHeaders()
    .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
  }).pipe(tap(()=>{
     this.listen().next();
   }))
  }

  updateCategory(value:any,id:number){
    return this.http.put(this.url + 'updateCategory/'+id, value,{
      headers:new HttpHeaders().set('Content-Type','application/json').set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }))
  }

}

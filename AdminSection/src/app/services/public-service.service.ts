import { Injectable ,OnInit} from '@angular/core';
import {Subject,Observable} from 'rxjs'
import {SuppliyerService} from "./suppliyer/suppliyer.service"
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

 
@Injectable({
  providedIn: 'root'
})
export class PublicServiceService {
  username='rana';
 
  private url = environment.serverURL;

  public singleCustomer:any=null;

  private  _listner=new Subject<any>();
  listen():any{
    return this._listner;
  }

  public setActive:any='dashboard';
  public editbill:any=null;

  public allSuppliyer:any=null;
  public allCustommer:any=null;

  constructor(private http:HttpClient,  private suppliyerService:SuppliyerService
    ,private cookeiset:CookieService
    ) { 
    
  }

  setSetAllSuppliyer() {
    const formData = new FormData();
    formData.append('User_ID', this.username);
      this.suppliyerService.getAllSuppliyer(formData).subscribe((result) => {
          this.allSuppliyer = result;
          //console.log(this.allSuppliyer)
      })
      return this.allSuppliyer;
  }

  topCustommer(value:any){
    return this.http.post(this.url + 'topcustommer', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }
  
  topsuppliyer(value:any){
    return this.http.post(this.url + 'topsuppliyer', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  topsalesproduct(value:any){
    return this.http.post(this.url + 'topsalesproduct', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  getchatdata(value:any){
    return this.http.post(this.url + 'bardetails', value,{
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    }).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  login(value:any){
    return this.http.post(this.url + 'login', value).pipe(tap(()=>{
      this.listen().next();
    }));
  }

  getUser():Observable<any>{
    
    return this.http.get(this.url + 'user', {
      headers:new HttpHeaders()
      .set('Authorization',  `Bearer ${this.cookeiset.get('Token')}`)
    });
  }

}

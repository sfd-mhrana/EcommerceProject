import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PublicServiceService } from 'src/app/services/public-service.service';
import {Router} from "@angular/router"
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-headersection',
  templateUrl: './headersection.component.html',
  styleUrls: ['./headersection.component.css']
})
export class HeadersectionComponent implements OnInit {

  userData:any=null;
  imgurl=environment.imageUrl+"shopuserImage/";
  constructor(private publicser:PublicServiceService,private cookeiser:CookieService,private router: Router,) {
    this.publicser.getUser().subscribe((result:any)=>{
      if(result.user){
        this.userData=result.user;
        //console.warn(this.userData)
      }
    })
  }

  ngOnInit(): void {
  }

  logout(){
    this.cookeiser.delete('Token');
    this.router.navigate(['/']);
    location.reload();
  }

}

import {Component } from '@angular/core';
import {DeviceDetectorService } from 'ngx-device-detector';
import {Router} from "@angular/router"
import {PublicServiceService} from './services/public-service.service'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  token:boolean=false;
  title = 'AdminSection';
  deviceInfo: any = null; isDesktopDevice:boolean=false;

  constructor(private deviceService: DeviceDetectorService,private router: Router,private publicser:PublicServiceService,
    private cookieService: CookieService
    ) {
    this.isDesktopDevice = this.deviceService.isDesktop();

    if(this.cookieService.check('Token')){
     
      this.publicser.getUser().subscribe((result:any)=>{
        if(result.user){
            this.token=true;
            router.navigate(['/deshboard']);
        }
      })
    }else{
      router.navigate(['/']);
    }

  }

}

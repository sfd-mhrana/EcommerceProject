import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import { PublicServiceService } from '../services/public-service.service';
import * as $ from 'jquery';
import { NotificationsService } from 'angular2-notifications';
import {Router} from "@angular/router"

@Component({
  selector: 'app-logincomponents',
  templateUrl: './logincomponents.component.html',
  styleUrls: ['./logincomponents.component.css']
})
export class LogincomponentsComponent implements OnInit {
  form:any;
  constructor(private cookeiser:CookieService,private publicser:PublicServiceService, private router: Router,private formBuilder: FormBuilder, private notisevice: NotificationsService,) {
    this. createForm();
   }

  ngOnInit(): void {
       
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        email: [null, Validators.required],
        password: [null, Validators.required]
      }
    )
  }
  
  login(){
      var fromdata=new FormData();
      fromdata.append('email', this.form.get('email')?.value)
      fromdata.append('password', this.form.get('password')?.value)
      this.publicser.login(fromdata).subscribe((result:any)=>{
        this.cookeiser.set('Token',result.token)
         this.router.navigate(['/deshboard']);
         location.reload();
      },
      (error) => {                             
        this.notisevice.warn('Warning', 'Something Wrong Please Check Email and Pass', {
          animate: 'fromTop'
        })
      }
    )
  }

}

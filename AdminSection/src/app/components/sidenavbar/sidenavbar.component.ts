import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PublicServiceService } from '../../services/public-service.service';
import {Subject,BehaviorSubject,Observable} from 'rxjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {
  public href: string = "";
  activeClass:any;
  refreshactive=new BehaviorSubject<boolean>(true);

  constructor(public publicSer: PublicServiceService, private ref: ChangeDetectorRef,private router: Router
    ) { 
    this.activeClass=this.publicSer.setActive;
      this.href=window.location.href;
      var result=[];
      result= this.href.split("/");
      if(this.activeClass!=""){
        if(result[3]!=""){
          this.activeClass=result[3];
        }else{ 
          this.activeClass="dashboard"
        }
      }
  }
 
  ngOnInit(): void {
    this.refreshactive.subscribe(()=>{
      this.activeClass;
    })
   
  }

  
  setActiveClass(value: any) {
    this.activeClass = value;
    this.refreshactive.next(true)
  }

}

import { Component, OnInit } from '@angular/core';
import { PublicServiceService } from 'src/app/services/public-service.service';

@Component({
  selector: 'app-suppliyerheadernav',
  templateUrl: './suppliyerheadernav.component.html',
  styleUrls: ['./suppliyerheadernav.component.css']
})
export class SuppliyerheadernavComponent implements OnInit {

  constructor(private publicser:PublicServiceService) { 
   
  }
 
  ngOnInit(): void { 
  
  }

}

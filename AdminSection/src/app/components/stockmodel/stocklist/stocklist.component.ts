import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock/stock.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.css']
})
export class StocklistComponent implements OnInit {
  username='rana';

  allStock:any=null;

  imgurl:any = environment.imageUrl+"productImage/"

  constructor(private stockser:StockService) {
    this.getAllStockList()
  }
 
  ngOnInit(): void {
  }


  getAllStockList(){
    var formdata = new FormData();
    formdata.append('User_ID', this.username);
    this.stockser.getALlStockList(formdata).subscribe((result)=>{
      this.allStock=result;
      console.warn(this.allStock)
    })
  }

}

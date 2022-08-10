import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { EmployeeserService } from 'src/app/services/employee/employeeser.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-monthlyreport',
  templateUrl: './monthlyreport.component.html',
  styleUrls: ['./monthlyreport.component.css']
})
export class MonthlyreportComponent implements OnInit {

  username: any = 'rana'; allSRArray: any = null;

  mongthlyReportByEmployee: any = null;

  refreshactive = new BehaviorSubject<boolean>(true);

  tableItem: any = null;

  MonthDate: any = null;

  employeeimage = environment.imageUrl+"employeeImage/"

  totalCost:any=0; totalProfit:any=0; totalSales:any=0; total_Return:any=0

  constructor(private employee: EmployeeserService) {
    this.getAllEmployeeTranjction()
  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.MonthDate; this.tableItem;
      this.totalProfit; this.totalCost; this.totalSales;this.total_Return
    })
  }

  getAllEmployeeTranjction() {
    var formdata = new FormData();
    formdata.append('User_ID', this.username);
    formdata.append('sales', 'sales');
    this.employee.getAllEmplyeeTranjction(formdata).subscribe((result) => {
      this.allSRArray = result;
      console.warn(this.allSRArray)
    })
  }


  SelectMonth(value: any) {
    if (value != '') {
      this.tableItem = [];
      this.MonthDate = value;
      var month = this.MonthDate.substr(0, 7)
      this.allSRArray.map((item: any) => {
        var monthlyReport: any = new Object();
        monthlyReport.EmployeeName = item.Employee_Name
        monthlyReport.EmployeeImage = item.Employee_Image
        monthlyReport.MonthDate = this.MonthDate
        if (item.sales.length === 0) {
          monthlyReport.TotalSales = 0
          monthlyReport.TotalProfit = 0
        } else {
          monthlyReport.TotalSales = item.sales.map((item2: any) => {
            if (item2.Sales_Date.substr(0, 7) == month) {
              return item2.Total_Price;
            }else{
              return 0
            }
          }).reduce((prev: any, next: any) => prev + next);

          monthlyReport.TotalProfit = item.sales.map((item3: any) => {
            var profit = 0;
            if (item3.Sales_Date.substr(0, 7) == month) {
              profit = (item3.Sales_Price - item3.product_g_r_n.Producut_Price)*item3.Quantaty;
              return profit;
            }else{
              return 0
            }
          }).reduce((prev: any, next: any) => prev + next);

        }
        if (item.all_costing.length === 0) {
          monthlyReport.TotalCost = 0
        } else {
          monthlyReport.TotalCost = item.all_costing.map((item4: any) => {
            if (item4.Date.substr(0, 7) == month) {
              return item4.Amount;
            }else{
              return 0
            }
          }).reduce((prev: any, next: any) => prev + next);

        }

        monthlyReport.totalReturn = 0;
        this.tableItem.push(monthlyReport)
      })

      this.setTotal()
    }
  }

  setTotal(){
    
    this.totalSales =this.tableItem.map((item: any) => { return item.TotalSales; }).reduce((prev: any, next: any) => prev + next);
    this.totalCost =this.tableItem.map((item: any) => { return item.TotalCost; }).reduce((prev: any, next: any) => prev + next);
    this.totalProfit =this.tableItem.map((item: any) => { return item.TotalProfit; }).reduce((prev: any, next: any) => prev + next);
    this.total_Return=this.tableItem.map((item: any) => { return item.totalReturn; }).reduce((prev: any, next: any) => prev + next);
  
  }


}


import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../../services/product/category.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
}) 
export class CategoryComponent implements OnInit {
  user = 'rana';  totalCategory:any=0; 
  //Update Variable
  categoryId: number = 0;

  // front end variable
  adddata: boolean = false; updateD: boolean = false; userdata = ''; 

  // api data array
  allcategory: any=null;

  // form related maker
  formData = new FormData();
  addCategory = new FormGroup(
    {
      User_ID: new FormControl('rana'),
      Name: new FormControl('')
    }
  )
  constructor(private categoryservice: CategoryService,private notisevice:NotificationsService
    ) {
     
     }

  ngOnInit(): void {
    this.categoryservice.listen().subscribe(() => {
      this.setdata();
    })
    this.setdata();
  }

  close() {
    
  }

  setdata() {
    this.formData.delete;
    this.formData.append('User_ID', this.user);
    this.allcategory = this.categoryservice.getAllcategory(this.formData).subscribe((result) => {
      //console.warn(result)
      this.allcategory = result;
      this.totalCategory=this.allcategory.length;
    });
  }

  onSubmit() {
    //console.warn(this.addCategory.value)
    if(this.validfrom()){
      this.categoryservice.createCategory(this.addCategory.value).subscribe((result)=>{
            if(result!=null){
              this.notisevice.success('Success','Category Created',{
                animate:'fromTop'
              })
            }else {
              this.notisevice.error('Alert','This name Already Have, Please Try new One..',{
                animate:'fromTop'
              })
            }
          })
          this.clear()
          this.setdata();
    }else{
      this.notisevice.error('Alert','Please, Fill Feild',{
        animate:'fromTop'
      })
    }
    
  }

  delete(id:any) {
  
    this.categoryservice.deleteCategory(id).subscribe((result)=>{
      if(result!=null){
         this.notisevice.alert('Success','Data Deleted',{
          animate:'fromTop'
        })
      }else{
        this.notisevice.error('Alert','You Can not delete this, Because There have one product in this category....',{
          animate:'fromTop'
        })
      }
    })
   }

  editset(id:number,name:string) {
    this.addCategory.reset({User_ID:this.user,Name:name})
    this.categoryId=id;
    this.updateD=true;
  } 

  clear() {
    this.addCategory.reset({User_ID:this.user,Name:''})
    this.updateD=false;
  }
  update(){
    this.categoryservice.updateCategory(this.addCategory.value,this.categoryId).subscribe((result)=>{
      if(result>0){
        this.adddata=true;
        this.userdata="Data Updated..........."
        this.clear()
      }
    })
  }

  validfrom(){
    if(this.addCategory.controls['Name'].value){
      return true;
    }else{
      return false;
    }
  }
}

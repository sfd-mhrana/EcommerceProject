import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { EmployeeserService } from 'src/app/services/employee/employeeser.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-newemployee',
  templateUrl: './newemployee.component.html',
  styleUrls: ['./newemployee.component.css']
})
export class NewemployeeComponent implements OnInit {
  username: string = 'rana';

  updateD: boolean = false; adddata: boolean = false; userdata: any = ''; TotalEmployee: any;

  form!: FormGroup; public id: any;
  formData = new FormData();
  updateEmployee = new FormData();

  files: any; allEmployee: any; imageSrc: any;
  imgurl = environment.imageUrl+"employeeImage/"

  constructor(private formBuilder: FormBuilder, private empolyee: EmployeeserService, private notisevice: NotificationsService,) {
    this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    this.empolyee.listen().subscribe(() => {
      this.setData();
      this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    })
    this.createForm();
    this.setData();
  }

  ngOnInit(): void {
    this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    this.empolyee.listen().subscribe(() => {
      this.setData();
      this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    })
    this.createForm();
    this.setData();
  }

  setData() {
    this.formData.append('User_ID', this.username);
    this.empolyee.getallEmployee(this.formData).subscribe((result) => {
      this.allEmployee = result;
      this.TotalEmployee = this.allEmployee.length;
      //console.warn(this.allproducts)
    })
  }
  createForm() {
    this.form = this.formBuilder.group(
      {
        User_ID: [this.username, Validators.required],
        Employee_ID: [this.id, Validators.required],
        Employee_Name: [null, Validators.required],
        Mobile: [null, Validators.required],
        Position: [null, Validators.required],
        Employee_Image: [null],
        Address: [null, Validators.required],
        Salary: [null, Validators.required]
      }
    )
  }
  clearForm() {
    this.files = null;
    this.updateD = false;
    this.form.reset(
      {
        User_ID: this.username,
        Employee_ID: this.id,
        Employee_Name: null,
        Mobile: null,
        Position: null,
        Employee_Image: null,
        Address: null,
        Salary: null,
      }
    )
    this.imageSrc = '';
  }
  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.files = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.files);
    }
  }

  update() {
    this.updateEmployee.delete;
    this.updateEmployee.append('User_ID', this.form.value['User_ID']);
    this.updateEmployee.append('Employee_ID', this.form.value['Employee_ID']);
    this.updateEmployee.append('Employee_Name', this.form.value['Employee_Name']);
    this.updateEmployee.append('Mobile', this.form.value['Mobile']);
    this.updateEmployee.append('Position', this.form.value['Position']);
    this.updateEmployee.append('Address', this.form.value['Address']);
    this.updateEmployee.append('Salary', this.form.value['Salary']);

    if (this.files != null) {
      this.updateEmployee.append('Employee_Image', this.files);
    }

    this.empolyee.updateEmployee(this.updateEmployee).subscribe((result) => {
      this.adddata = true;
      this.userdata = "Product Updated"
      //console.warn(result);
      this.clearForm();
    });
  }

  onSubmit() {
    if(this. validFrom()){
      let formdata = new FormData();
      formdata.append('User_ID', this.form.value['User_ID']);
      formdata.append('Employee_ID', this.form.value['Employee_ID']);
      formdata.append('Employee_Name', this.form.value['Employee_Name']);
      formdata.append('Mobile', this.form.value['Mobile']);
      formdata.append('Position', this.form.value['Position']);
      formdata.append('Address', this.form.value['Address']);
      formdata.append('Salary', this.form.value['Salary']);
      formdata.append('Employee_Image', this.files);
      //console.warn(formdata)
      this.empolyee.createEmployee(formdata).subscribe((result:any) => {
        //console.warn(result)
        if (result != null) {
          if(result.title){
            this.notisevice.success(result.title, result.message, {
              animate: 'fromTop'
            })
          }else{
            this.notisevice.success('Success', 'New Employee Added', {
              animate: 'fromTop'
            })
          }
          
          this.clearForm();
        } else {
          this.notisevice.warn('Wrong', '!This Employee Already Have, If Your want to add new Please, Change name or mobile..', {
            animate: 'fromTop'
          })
        }
      });
    }else{

    }
   
  }

  deleteEmployee(Employee_ID: any) {
    this.empolyee.deleteEmployee(Employee_ID).subscribe(() => {
      this.adddata = true;
      this.userdata = "Data Deleted..........."
    })
  }

  setEditData(p: any) {
    this.form.reset(
      {
        User_ID: this.username,
        Employee_ID: p.Employee_ID,
        Employee_Name: p.Employee_Name,
        Mobile: p.Mobile,
        Position: p.Position,
        Address: p.Address,
        Salary: p.Salary
      }
    )
    this.imageSrc = this.imgurl + "/" + p.Employee_Image
    this.updateD = true;
  }

  validFrom() {

    if (this.form.controls['Employee_Name'].value) {
      if (this.form.controls['Position'].value) {
        if (this.form.controls['Mobile'].value) {
          if (this.form.controls['Salary'].value) {
            if (this.form.controls['Address'].value) {
              if (this.files != null) {
                return true;
              } else {
                this.notisevice.warn('Wrong', 'Please Select Files', {
                  animate: 'fromTop'
                })
                return false;
              }
            }
            else {
              this.notisevice.warn('Wrong', 'Please Field Address', {
                animate: 'fromTop'
              })
              return false;
            }
          } else {
            this.notisevice.warn('Wrong', 'Please Enter Salary', {
              animate: 'fromTop'
            })
            return false;
          }
        } else {
          this.notisevice.warn('Wrong', 'Please Enter Mobile', {
            animate: 'fromTop'
          })
          return false;
        }
      } else {
        this.notisevice.warn('Wrong', 'Please Select Position', {
          animate: 'fromTop'
        })
        return false;
      }
    } else {
      this.notisevice.warn('Wrong', 'Please Enter Employee Name', {
        animate: 'fromTop'
      })
      return false;
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { SuppliyerService } from 'src/app/services/suppliyer/suppliyer.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-suppliyer',
  templateUrl: './new-suppliyer.component.html',
  styleUrls: ['./new-suppliyer.component.css']
})
export class NewSuppliyerComponent implements OnInit {
  username = 'rana'; imageSrc: any;  oldcumpanyname:any;oldaddress:any;

  updateD: boolean = false; adddata: boolean = false; userdata: any = ''; customerId: any;

  files: any = null; allSuppliyer: any; totalSuppliyer: any;

  formData = new FormData();
  updated = new FormData();
  form!: FormGroup;
  imgurl =environment.imageUrl+ "suppliyerImage/";

  constructor(private formBuilder: FormBuilder, private suppliyer: SuppliyerService, private notisevice: NotificationsService,) {

    this.setData();
  }

  ngOnInit(): void {

    this.suppliyer.listen().subscribe(() => {
      this.setData();
    })
    this.createForm();
    this.setData();
  }
  setData() {
    let surch = new FormData();
    surch.append('User_ID', this.username);
    this.suppliyer.getAllSuppliyer(surch).subscribe((result) => {
      this.allSuppliyer = result;
      this.totalSuppliyer = this.allSuppliyer.length;
      //console.warn(this.allproducts)
    })
  }

  clearForm() {
    this.files = null;
    this.updateD = false;
    this.customerId = null;
    this.form = this.formBuilder.group(
      {
        User_ID: [this.username, Validators.required],
        Suppliyer_Name: [null, Validators.required],
        Company_Name: [null, Validators.required],
        Mobile: [null, Validators.required],
        Suppliyer_Image: [null],
        Address: [null, Validators.required]
      }
    )
    this.imageSrc = '';
  }
  createForm() {

    this.form = this.formBuilder.group(
      {
        User_ID: [this.username, Validators.required],
        Suppliyer_Name: [null, Validators.required],
        Company_Name: [null, Validators.required],
        Mobile: [null, Validators.required],
        Suppliyer_Image: [null],
        Address: [null, Validators.required]
      }
    )

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
    this.updated.append('id', this.customerId);
    this.updated.append('User_ID', this.form.value['User_ID']);
    this.updated.append('Suppliyer_Name', this.form.value['Suppliyer_Name']);
    this.updated.append('Company_Name', this.form.value['Company_Name']);
    this.updated.append('OCompany_Name', this.oldcumpanyname);
    this.updated.append('Mobile', this.form.value['Mobile']);
    this.updated.append('Address', this.form.value['Address']);
    this.updated.append('OAddress', this.oldaddress);
    if (this.files != null) {
      this.updated.append('Suppliyer_Image', this.files);
    }
    //console.warn(this.formData)
    this.suppliyer.updateSuppliyer(this.updated).subscribe((result) => {
      //console.warn(result)
      this.adddata = true;
      this.userdata = "Product Added"
      this.clearForm();
    });
  }

  onSubmit() {
    if (this.validFrom()) {
      this.formData.append('User_ID', this.form.value['User_ID']);
      this.formData.append('Suppliyer_Name', this.form.value['Suppliyer_Name']);
      this.formData.append('Company_Name', this.form.value['Company_Name']);
      this.formData.append('Mobile', this.form.value['Mobile']);
      this.formData.append('Address', this.form.value['Address']);
      this.formData.append('Suppliyer_Image', this.files);
      //console.warn(this.formData)
      this.suppliyer.createSuppliyer(this.formData).subscribe((result) => {
        if (result != null) {
          this.notisevice.success('Success', 'New Suppliyer Added', {
            animate: 'fromTop'
          })

          this.clearForm();
        } else {
          this.notisevice.warn('Wrong', 'This Suppliyer Already Have', {
            animate: 'fromTop'
          })
        }

      });
    } else {

    }

  }

  setEditData(custolist: any) {
    this.customerId = custolist.id
    this.oldcumpanyname=custolist.Company_Name;
    this.oldaddress=custolist.Address
    this.form.reset(
      {
        User_ID: this.username,
        Company_Name: custolist.Company_Name,
        Suppliyer_Name: custolist.Suppliyer_Name,
        Mobile: custolist.Mobile,
        Address: custolist.Address
      }
    )
    this.imageSrc = this.imgurl + "/" + custolist.Suppliyer_Image
    this.updateD = true;
  }

  deleteCusto(id: any) {
    
    this.suppliyer.deteleSuppliyer(id).subscribe((result) => {
      if (result== null) {
        this.notisevice.warn('Wrong', 'Your Can not Delete This Suppliyer, Because Your Purchases Some Product from This Suppliyer..', {
          animate: 'fromTop'
        })

        this.clearForm();
      } else {
        this.notisevice.success('Success', 'Suppliyer Deleted', {
          animate: 'fromTop'
        })
      }
    })
  }

  validFrom() {

    if (this.form.controls['Suppliyer_Name'].value) {
      if (this.form.controls['Company_Name'].value) {
        if (this.form.controls['Mobile'].value) {
          if (this.form.controls['Address'].value) {
            if (this.files != null) {
              return true;
            } else {
              this.notisevice.warn('Wrong', 'Please Select Files', {
                animate: 'fromTop'
              })
              return false;
            }
          } else {
            this.notisevice.warn('Wrong', 'Please Enter Address', {
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
        this.notisevice.warn('Wrong', 'Please Enter Company Name', {
          animate: 'fromTop'
        })
        return false;
      }
    } else {
      this.notisevice.warn('Wrong', 'Please Enter Suppliyer Name', {
        animate: 'fromTop'
      })
      return false;
    }

  }

}

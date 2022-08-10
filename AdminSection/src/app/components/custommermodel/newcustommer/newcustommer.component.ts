import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { CustommerService } from 'src/app/services/custommer/custommer.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-newcustommer',
  templateUrl: './newcustommer.component.html',
  styleUrls: ['./newcustommer.component.css']
})
export class NewcustommerComponent implements OnInit {
  private username = 'rana'; oldcumpanyname:any;oldaddress:any;

  adddata: boolean = false; updateD: boolean = false; userdata = ''; imgurl: any; customerId: any;
  totalCustommer: any;
  imageSrc: any;
  form!: FormGroup;
  files: any = null;

  public allCustommer: any = null;
  formData = new FormData();
  updateFormdata: FormData = new FormData();

  constructor(private formBuilder: FormBuilder, private custoser: CustommerService, private notisevice: NotificationsService,) { }

  ngOnInit(): void {
    this.imgurl = environment.imageUrl+"custommerImage/"
    this.custoser.listen().subscribe(() => {
      this.setData();
    })
    this.createForm();
    this.setData();
  }



  createForm() {

    this.form = this.formBuilder.group(
      {
        User_ID: [this.username, Validators.required],
        Custommer_Name: [null, Validators.required],
        Company_Name: [null, Validators.required],
        Mobile: [null, Validators.required],
        Custommer_Image: [null],
        Address: [null, Validators.required]
      }
    )
  }

  setData() {
    this.formData.delete;
    this.formData.append('User_ID', this.username);
    this.custoser.getAllCustommer(this.formData).subscribe((result) => {
      this.allCustommer = result;
      this.totalCustommer = this.allCustommer.length;
      //console.warn(this.allproducts)
    })
  }
  
  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.files = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.files);
    }
  }

  clearForm() {
    this.files = null;
    this.updateD = false;
    this.customerId = null;
    this.form = this.formBuilder.group(
      {
        User_ID: [this.username, Validators.required],
        Custommer_Name: [null, Validators.required],
        Company_Name: [null, Validators.required],
        Mobile: [null, Validators.required],
        Custommer_Image: [null],
        Address: [null, Validators.required]
      }
    )
    this.imageSrc = '';
    this.formData.delete
  }

  onSubmit() {
    if (this.validFrom()) {
      let formdata = new FormData();
      formdata.append('User_ID', this.form.value['User_ID']);
      formdata.append('Custommer_Name', this.form.value['Custommer_Name']);
      formdata.append('Company_Name', this.form.value['Company_Name']);
      formdata.append('Mobile', this.form.value['Mobile']);
      formdata.append('Address', this.form.value['Address']);
      formdata.append('Custommer_Image', this.files);
      //console.warn(formdata)
      this.custoser.createCustommer(formdata).subscribe((result) => {
        if (result != null) {
          this.notisevice.success('Success', 'New Custommer Added', {
            animate: 'fromTop'
          })
          this.setData();
          this.clearForm();
        } else {
          this.notisevice.warn('Wrong', 'This Custommer Already Have', {
            animate: 'fromTop'
          })
        }

      });
    } else {

    }

  }

  update() {
    let formdata = new FormData();
    formdata.append('id', this.customerId);
    formdata.append('User_ID', this.form.value['User_ID']);
    formdata.append('Custommer_Name', this.form.value['Custommer_Name']);
    formdata.append('Company_Name', this.form.value['Company_Name']);
    formdata.append('OCompany_Name', this.oldcumpanyname);
    formdata.append('Mobile', this.form.value['Mobile']);
    formdata.append('Address', this.form.value['Address']);
    formdata.append('OAddress', this.oldaddress);
    if (this.files != null) {
      formdata.append('Custommer_Image', this.files);
    }
    //console.warn(formdata)
    this.custoser.updateCustommer(formdata).subscribe((result) => {
      //console.warn(result)
      this.adddata = true;
      this.userdata = "Product Added"
      this.clearForm();
    });
  }

  setEditData(custolist: any) {
    this.customerId = custolist.id
    this.oldcumpanyname=custolist.Company_Name;
    this.oldaddress=custolist.Address;
    this.form.reset(
      {
        User_ID: this.username,
        Company_Name: custolist.Company_Name,
        Custommer_Name: custolist.Custommer_Name,
        Mobile: custolist.Mobile,
        Address: custolist.Address
      }
    )
    this.imageSrc = this.imgurl + "/" + custolist.Custommer_Image;
    this.updateD = true;
  }

  deleteCusto(id: any) {
    if (window.confirm("Are you sure to Custommer ")) {
      this.custoser.detelecustommer(id).subscribe((result) => {
        if (result == null) {
          this.notisevice.warn('Wrong', 'Your Can not Delete This Custommer, Because Some Sales Product found This Custommer..', {
            animate: 'fromTop'
          })

          this.clearForm();
        } else {
          this.notisevice.success('Success', 'Custommer Deleted', {
            animate: 'fromTop'
          })
        }
      })
    } else {

    }
  }

  validFrom() {

    if (this.form.controls['Custommer_Name'].value) {
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
      this.notisevice.warn('Wrong', 'Please Enter Custommer Name', {
        animate: 'fromTop'
      })
      return false;
    }

  }

}

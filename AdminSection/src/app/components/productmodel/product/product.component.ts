import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ProductserService } from "../../../services/product/productser.service";
import { CategoryService } from "../../../services/product/category.service";
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
 
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  username = 'rana'

  // Front end design work
  categoryname: any ; categoryId: any; imageSrc: any = ''; totalProduct: any;
  refreshactive = new BehaviorSubject<boolean>(true);
  updateD: boolean = false; adddata: boolean = false; userdata: string = ''

  public id: any; allproducts: any; imgurl: any;
  files: any = null;
  form!: FormGroup;
  allCategory: any;
  productIDForUp: any;
  formData = new FormData();
  updateFormdata: FormData = new FormData();

  constructor(private products: ProductserService, private formBuilder: FormBuilder, private notisevice: NotificationsService,
    private categorys: CategoryService) {
    this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    this.imgurl = environment.imageUrl+"productImage/"

  }

  ngOnInit(): void {
    this.refreshactive.subscribe(() => {
      this.categoryname;
    })

    $('.dropdown').click(function () {
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });



    this.createForm()
    this.products.listen().subscribe(() => {
      this.setData();
      this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    })

    this.formData.delete;
    this.formData.append('User_ID', this.username);
    this.categorys.getAllcategory(this.formData).subscribe((result) => {
      this.allCategory = result;
    })
    this.setData();
  }

  setCategory(value: any, name: any) {
    this.categoryname = name;
    this.categoryId = value;
  }
  createForm() {

    this.form = this.formBuilder.group(
      {
        User_ID: [this.username, Validators.required],
        Product_ID: [this.id, Validators.required],
        Product_Category_ID: [null, Validators.required],
        Product_Name: [null, Validators.required],
        Producut_Images: [null],
        Producut_Details: [null, Validators.required],
        Producut_Price: [null, Validators.required]
      }
    )
  }

  setData() {
    let newform = new FormData();
    newform.append('User_ID', this.username);
    this.products.getAllProdcut(newform).subscribe((result) => {
      this.allproducts = result;
      this.totalProduct = this.allproducts.length;
      //console.warn(this.allproducts)
    })
  }


  update() {

    var fromdata=new FormData();
    fromdata.append('User_ID', this.form.value['User_ID']);
    fromdata.append('Product_ID', this.form.value['Product_ID']);
    fromdata.append('Product_Category_ID', this.form.value['Product_Category_ID']);
    fromdata.append('Product_Name', this.form.value['Product_Name']);
    fromdata.append('Producut_Details', this.form.value['Producut_Details']);
    fromdata.append('Producut_Price', this.form.value['Producut_Price']);

    if (this.files != null) {
      fromdata.append('Producut_Images', this.files);
    }

    this.products.updateProduct(fromdata).subscribe((result) => {
      this.adddata = true;
      this.userdata = "Product Updated"
      console.warn(result);
      this.clearForm();
    });
  }

  onSubmit() {
    if (this.validfrom()) {
      this.updateFormdata.delete;
      let submitfrom = new FormData();
      submitfrom.append('User_ID', this.form.value['User_ID']);
      submitfrom.append('Product_ID', this.form.value['Product_ID']);
      submitfrom.append('Product_Category_ID', this.categoryId);
      submitfrom.append('Product_Name', this.form.value['Product_Name']);
      submitfrom.append('Producut_Details', this.form.value['Producut_Details']);
      submitfrom.append('Producut_Price', this.form.value['Producut_Price']);
      submitfrom.append('Producut_Images', this.files);

      this.products.createProduct(submitfrom).subscribe((result) => {
        //console.warn(result)
        if (result != null) {
          this.notisevice.success('Success', 'Product Created', {
            animate: 'fromTop'
          })
          this.clearForm();
          this.setData();
        } else {
          this.notisevice.error('Alert', 'This name Already Have, Please Try new One Or Change Category..', {
            animate: 'fromTop'
          })
        }


      });
    }
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
    this.productIDForUp = '';
    this.imageSrc = '';
    this.form.reset(
      {
        User_ID: this.username,
        Product_ID: this.id,
        Product_Category_ID: null,
        Product_Name: null,
        Producut_Images: null,
        Producut_Details: null,
        Producut_Price: null,
      }
    )
    this.categoryname=null;
  }
  setEditData(p: any) {
    this.form.reset(
      {
        User_ID: this.username,
        Product_ID: p.Product_ID,
        Product_Category_ID: p.category.id,
        Product_Name: p.Product_Name,
        Producut_Details: p.Producut_Details,
        Producut_Price: p.Producut_Price
      }
    )
    this.imageSrc = this.imgurl + "/" + p.Producut_Images
    this.updateD = true;
  }

  deleteproduct(value: any) {
    var fromdata = new FormData();
    fromdata.append('User_ID', this.username);
    fromdata.append('Product_ID', value.Product_ID);
    this.products.deleteProduct(fromdata).subscribe((result) => {
      if (result != null) {
        this.notisevice.alert('Success', 'Data Deleted', {
          animate: 'fromTop'
        })
      } else {
        this.notisevice.error('Alert', 'You Can not delete this, Because There have one Purchases in this Product....', {
          animate: 'fromTop'
        })
      }
    })
  }
  
  validfrom() {
    if (this.categoryId) {
      if (this.form.controls['Product_Name'].value) {
        if (this.form.controls['Producut_Details'].value) {
          if (this.form.controls['Producut_Price'].value) {
            if (this.files) {
              return true;
            } else {
              this.notisevice.warn('Wrong', 'Please, Select Product Image', {
                animate: 'fromTop'
              })
              return false;
            }
          } else {
            this.notisevice.warn('Wrong', 'Please, Enter Product Price', {
              animate: 'fromTop'
            })
            return false;
          }
        } else {
          this.notisevice.warn('Wrong', 'Please, Enter Product Details', {
            animate: 'fromTop'
          })
          return false;
        }
      } else {
        this.notisevice.warn('Wrong', 'Please, Enter Product Name', {
          animate: 'fromTop'
        })
        return false;
      }
    } else {
      this.notisevice.warn('Wrong', 'Please, Select Category ID', {
        animate: 'fromTop'
      })
      return false;
    }
  }

}

import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Customer } from '../customer'
import { CustomerService } from '../customer.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import swal from 'sweetalert2'



@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  showDetailPass: boolean = true;

  @Input()
  customer: Customer;

  @Output()
  result = new EventEmitter()

  @Output()
  resultForm = new EventEmitter()

  customerFormGroup: FormGroup;
  hidenAdd: boolean;
  hidenSubmit: boolean;
  //showDetailPass: boolean = false;
  constructor(private customerService: CustomerService, private formbuilder: FormBuilder) { }

  ngOnInit() {
    window.scrollBy(0, 1000);

    this.customerFormGroup = this.formbuilder.group({
      customernumber: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      phonenumber: [''],
      phonetype: [''],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.updateData();
    //this.resultForm.emit(true)
    // this.scrollWin()
  }

  scrollWin() {
    // window.scrollBy(0, 1000);
  }

  submitDataForm() {
    let customer: Customer = new Customer();
    customer.customernumber = this.customerFormGroup.controls['customernumber'].value;
    customer.firstname = this.customerFormGroup.controls['firstname'].value;
    customer.lastname = this.customerFormGroup.controls['lastname'].value;
    customer.birthdate = this.customerFormGroup.controls['birthdate'].value;
    customer.phonenumber = this.customerFormGroup.controls['phonenumber'].value;
    customer.phonetype = this.customerFormGroup.controls['phonetype'].value;
    customer.username = this.customerFormGroup.controls['username'].value;
    customer.password = this.customerFormGroup.controls['password'].value;

    this.customerService.update(customer).subscribe((response) => {
      console.log(JSON.stringify(response));
      this.result.emit(true);
    }, (err) => {
      alert('error : ' + JSON.stringify(err));
    })
  }

  submitDataFormSave() {
    let customer: Customer = new Customer();
    customer.firstname = this.customerFormGroup.controls['firstname'].value;
    customer.lastname = this.customerFormGroup.controls['lastname'].value;
    customer.birthdate = this.customerFormGroup.controls['birthdate'].value;
    customer.phonenumber = this.customerFormGroup.controls['phonenumber'].value;
    customer.phonetype = this.customerFormGroup.controls['phonetype'].value;
    customer.username = this.customerFormGroup.controls['username'].value;
    customer.password = this.customerFormGroup.controls['password'].value;

    this.customerService.insert(customer).subscribe((response) => {
      console.log(JSON.stringify(response));
      this.result.emit(true);
    }, (err) => {
      alert('error : ' + JSON.stringify(err));
    })
  }

  submitData() {
    this.customerService.update(this.customer).subscribe((response) => {
      console.log(JSON.stringify(response));
      this.result.emit(true);
    }, (err) => {
      alert('error : ' + JSON.stringify(err));
    })
  }

  cancelChanges() {
    this.result.emit(true);
  }

  updateData() {
    this.setDatatoForm(this.customer);
  }

  setDatatoForm(customer) {
    if (this.customer) {
      this.customerFormGroup.controls['customernumber'].setValue(this.customer.customernumber);
      this.customerFormGroup.controls['firstname'].setValue(this.customer.firstname);
      this.customerFormGroup.controls['lastname'].setValue(this.customer.lastname);
      this.customerFormGroup.controls['birthdate'].setValue(this.customer.birthdate);
      this.customerFormGroup.controls['phonenumber'].setValue(this.customer.phonenumber);
      this.customerFormGroup.controls['phonetype'].setValue(this.customer.phonetype);
      this.customerFormGroup.controls['username'].setValue(this.customer.username);
      this.customerFormGroup.controls['password'].setValue(this.customer.password);
    }
  }

  prosesResultForm(resultForm) {
    if (resultForm) {
      this.setDatatoForm(this.customer)
    }
  }

  prosesResulthideAdd(hideAdd) {
    if (hideAdd) {
      this.hidenAdd = false;
    }
  }

  prosesResulthideSubmit(hideSubmit) {
    if (hideSubmit == 1) {
      this.hidenSubmit = true;
    } else {
      this.hidenSubmit = false;
    }
  }


  savesweet() {
    swal({
      type: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    this.submitDataFormSave()
  }

  updatesweet() {
    swal({
      type: 'success',
      title: 'Your work has been updated',
      showConfirmButton: false,
      timer: 1500
    })
    this.submitDataForm()
  }
}

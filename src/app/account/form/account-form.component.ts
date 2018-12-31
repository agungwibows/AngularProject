import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Account } from '../account'
import { AccountService } from '../account.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Customer } from 'src/app/customer/customer';
import { ActivatedRoute, Router } from '@angular/router';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {
  ListCustomer: Customer[] = [];
  customer: Customer = new Customer();
  @Input()
  account: Account;
  showCustNum: boolean=false;

  @Output()
  result = new EventEmitter()

  accountFormGroup: FormGroup;

  //showDetailPass: boolean = false;
  constructor(
    private accountService: AccountService, 
    private formbuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private route: Router) { }

  ngOnInit() {
    window.scrollBy(0, 1000);
    this.activatedRoute.params.subscribe(params => {
      const customer: String = params['customer'];
      console.log('Customer ini harusnya'+ customer)
      if (customer == null){
        this.accountFormGroup = this.formbuilder.group({
          accountNumber: [''],
          openDate: ['', Validators.required],
          balance: ['', Validators.required],
          custnumbid: ['', Validators.required]
        });
        this.loadDataCustomer();
        this.showCustNum = true;
      }else{
        this.accountFormGroup = this.formbuilder.group({
          accountNumber: [''],
          openDate: ['', Validators.required],
          balance: ['', Validators.required],
          custnumbid:customer 
        }); 
        this.showCustNum=false;
      }
    });
    this.updateData();
    // window.scrollBy(0, 2000);
    // this.scrollWin();
  }

  loadDataCustomer() {
    this.accountService.getListCustomer().subscribe((response) => {
      console.log(JSON.stringify(response));
      Object.assign(this.ListCustomer, response['values']);
    }, (err) => {
      alert('error : ' + JSON.stringify(err));
    })
  }

  submitDataForm() {
    let account: Account = new Account();
    account.accountNumber = this.accountFormGroup.controls['accountNumber'].value;
    account.openDate = this.accountFormGroup.controls['openDate'].value;
    account.balance = this.accountFormGroup.controls['balance'].value;

    let customer: Customer = new Customer();
    customer.customernumber = this.accountFormGroup.controls['custnumbid'].value;
    // account.custnumbid = this.accountFormGroup.controls['custnumbid'].value;
    account.customer = customer

    this.accountService.update(account).subscribe((response) => {
      console.log(JSON.stringify(response));
      this.result.emit(true);
    }, (err) => {
      alert('error : ' + JSON.stringify(err));
    })
  }

  submitDataFormSave() {
    let account: Account = new Account();
    account.openDate = this.accountFormGroup.controls['openDate'].value;
    account.balance = this.accountFormGroup.controls['balance'].value;

    let customer: Customer = new Customer();
    customer.customernumber = this.accountFormGroup.controls['custnumbid'].value;
    account.customer = customer

    this.accountService.insert(account).subscribe((response) => {
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
    this.setDatatoForm(this.account);
  }

  setDatatoForm(account: Account) {
    if (this.account) {
      this.accountFormGroup.controls['accountNumber'].setValue(account.accountNumber);
      this.accountFormGroup.controls['openDate'].setValue(account.openDate);
      this.accountFormGroup.controls['balance'].setValue(account.balance);
      
      if (account.customer) {
        this.customer = account.customer;
        this.accountFormGroup.controls['custnumbid'].setValue(account.customer.customernumber);
        console.log('customer :' + this.customer.customernumber);
        console.log('fg customer :' + this.accountFormGroup.controls['custnumbid'].value);
      }
      this.setSelectedCustomer(account.customer);
      // let customer: Customer = new Customer();
      // customer.customernumber = this.accountFormGroup.controls['custnumbid'].value;
      // account.customer= customer

    }
  }

  setSelectedCustomer(customer: Customer){
    //this.setDatatoForm(this.account);
    this.accountFormGroup.controls['custnumbid'].setValue(customer.customernumber);
    this.accountFormGroup.updateValueAndValidity();
  }
  prosesResultForm(resultForm) {
    if (resultForm) {
      this.setDatatoForm(this.account)
    }
  }

  savesweet(){
    swal({
      type: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    this.submitDataFormSave()
  }

  updatesweet(){
    swal({
      type: 'success',
      title: 'Your work has been updated',
      showConfirmButton: false,
      timer: 1500
    })
    this.submitDataForm()
  }
}

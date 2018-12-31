import { Component, OnInit, EventEmitter,Output, ViewChild } from '@angular/core';
import { Customer } from '../customer'
import { CustomerService } from '../customer.service';
import { CustomerFormComponent } from '../form/customer-form.component';
import { Router } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import  swal  from 'sweetalert2'

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})

export class CustomerListComponent implements OnInit {
  @ViewChild('formCustomer')
  formCustomer: CustomerFormComponent;
  ListCustomer: Customer[] = [];
  showDetail: boolean = false;
  selectedCustomer: Customer = new Customer();
  status: string;
  message: string;

  @Output()
  hideAdd = new EventEmitter()

  @Output()
  hideSubmit = new EventEmitter()

  constructor(private customerService: CustomerService, private route: Router) { }

  ngOnInit() {
    this.loadData();
  } 

  selectCustomer(customer: Customer) {
    let copyCustomer = new Customer();
    copyCustomer.customernumber = customer.customernumber;
    copyCustomer.firstname = customer.firstname;
    copyCustomer.lastname = customer.lastname;
    copyCustomer.birthdate = customer.birthdate;
    copyCustomer.phonenumber = customer.phonenumber;
    copyCustomer.phonetype = customer.phonetype;
    copyCustomer.username = customer.username;
    copyCustomer.password = customer.password;
    this.selectedCustomer = copyCustomer;
    this.showDetail = true;
    this.formCustomer.updateData();
    // this.hideAdd.emit(true);
  }
  
  addCustomer() {
    let copyCustomer = new Customer();
    this.selectedCustomer = copyCustomer;
    this.showDetail = true;
    window.scrollBy(0, 1000);
  }
  
  loadData(){
    this.customerService.getList().subscribe((response)=>{
      console.log(JSON.stringify(response));
      Object.assign(this.ListCustomer,response['values']);
      // Object.assign(this.status,response['status']);
      // Object.assign(this.message,response['message']);
      // if(this.status!=0){
      // this.getMsgAPI(this.message)
      // }
    },(err)=>{
      alert('error : '+JSON.stringify(err));
    })
  }

  prosesResult(result) {
    if(result) {
      this.showDetail=false;
      this.loadData();
    }
  }

  deleteData(customer: Customer){
    this.customerService.delete(customer).subscribe((response)=>{
      status = JSON.stringify(response)['status'];
      console.log('ini status'+status)
      console.log('ini status2'+JSON.stringify(response)['message'])
    },(err)=>{
      alert('error : '+JSON.stringify(err));
    })
  } 

deleteRow(customer: Customer){
  swal({
    title: 'Are you sure?',
    text: 'You will not be able to recover this imaginary file!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
    // customClass: "animated tada"
  }).then((result) => {
    
    if (result.value) {
      this.deleteData(customer);
      swal({
        title: 'Deleted!',
        text: 'Your imaginary file has been deleted.',
        type: 'success',
        showConfirmButton: false,
        timer: 1200
      }).then(() => {
        this.deleteData(customer);
      })
    } else if (result.dismiss === swal.DismissReason.cancel) {
      swal({
        title: 'Cancelled',
        text: 'Your imaginary file is safe :)',
        type: 'error',
        showConfirmButton: false,
        timer: 1200
    })
    }
  })
}
  viewAccount(customer: Customer){
    console.log ('customer'+customer.customernumber);
    this.route.navigate(['/account-list',{ customer: customer.customernumber}]);
  }

  myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
  bodyFunction() {
    document.body.style.background = "#363E58";
  }

  getMsgAPI(message:string){
    swal({
      type: 'error',
      title: 'Oops...',
      text: message,
      // footer: '<a href>Why do I have this issue?</a>'
    })
  }
}
 
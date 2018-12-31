import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from '../../../customer/customer'
import { CustomerService } from 'src/app/customer/customer.service';

@Component({
  selector: 'app-combo-customer',
  templateUrl: './combo-customer.component.html',
  styleUrls: ['./combo-customer.component.css']
})
export class ComboCustomerComponent implements OnInit {

ListCustomer: Customer []=[];

@Output()
customer = new EventEmitter<Customer>();

@Input()
selectedCustomer: Customer;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    console.log('init combo customer')
    this.loadData();
  }

  onChange(index){
    console.log('selected : '+ index ? JSON.stringify(index) : "")
    if(this.ListCustomer && this.ListCustomer.length > 0){
    this.customer.emit(this.ListCustomer[index]);
    }
  }

  loadData(){
    this.customerService.getList().subscribe((response)=>
    {
      console.log(JSON.stringify(response));
      Object.assign(this.ListCustomer, response['values']);
    }, (err) =>{
      alert('error : '+JSON.stringify(err));
    })
  }

}

import { Component, OnInit, EventEmitter,Output,Input } from '@angular/core';
import { Transactions } from '../transactions'
import { TransactionsService } from '../transactions.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Account } from '../../account/account'
import { ActivatedRoute } from '@angular/router';
import  swal  from 'sweetalert2';


@Component({
  selector: 'app-transactions-form',
  templateUrl: './transactions-form.component.html',
  styleUrls: ['./transactions-form.component.css']
})
export class TransactionsFormComponent implements OnInit {
  ListAccount: Account[] = [];
  account: Account = new Account();
  @Input()
  transactions:Transactions;
  showAccnum:boolean;
  @Output()
  result = new EventEmitter()
  
  transactionsFormGroup: FormGroup;
  
  //showDetailPass: boolean = false;
    constructor(
      private transactionsService: TransactionsService, 
    private activatedRoute: ActivatedRoute,
    private formbuilder: FormBuilder) { }
  
    ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
        const account: String = params['account'];
        if (account==null){
          this.transactionsFormGroup = this.formbuilder.group({
            id: [''],
            type: ['', Validators.required],
            amount: ['', Validators.required],
            amountsign: ['', Validators.required],
            accnumbid: ['', Validators.required] 
          });
          this.showAccnum=true;
          this.loadDataAccount();
        }else{
          this.transactionsFormGroup = this.formbuilder.group({
            id: [''],
            type: ['', Validators.required],
            amount: ['', Validators.required],
            amountsign: ['', Validators.required],
            accnumbid: account
          });
          this.showAccnum=false;
        }
      });
      this.updateData();
      //this.resultForm.emit(true)
    window.scrollBy(0, 1000);

    }
  
    loadDataAccount(){
      this.transactionsService.getListAccount().subscribe((response)=>{
        console.log(JSON.stringify(response['values']));
        Object.assign(this.ListAccount,response['values']);
      },(err)=>{
        alert('error : '+JSON.stringify(err));
      })
    }
  
    submitDataForm(){
      let transactions: Transactions = new Transactions();
      transactions.id = this.transactionsFormGroup.controls['id'].value;
      transactions.type = this.transactionsFormGroup.controls['type'].value;
      transactions.amount = this.transactionsFormGroup.controls['amount'].value;
      transactions.amountsign = this.transactionsFormGroup.controls['amountsign'].value;
  
      let account: Account = new Account();
      account.accountNumber = this.transactionsFormGroup.controls['accnumbid'].value;
      transactions.account= account;
      //transactions.custnumbid = this.transactionsFormGroup.controls['custnumbid'].value;
  
      this.transactionsService.update(transactions).subscribe((response)=>{
        console.log(JSON.stringify(response));
        this.result.emit(true);
      },(err)=>{
        alert('error : '+JSON.stringify(err));
      })
    }
  
    submitDataFormSave(){
      let transactions: Transactions = new Transactions();
      transactions.type = this.transactionsFormGroup.controls['type'].value;
      transactions.amount = this.transactionsFormGroup.controls['amount'].value;
      transactions.amountsign = this.transactionsFormGroup.controls['amountsign'].value;
  
      let account: Account = new Account();
      account.accountNumber = this.transactionsFormGroup.controls['accnumbid'].value;
      transactions.account= account;
  
      this.transactionsService.insert(transactions).subscribe((response)=>{
        console.log(JSON.stringify(response));
        this.result.emit(true);
      },(err)=>{
        alert('error : '+JSON.stringify(err));
      })
    }
  
    submitDataFormDelete(){
      let transactions: Transactions = new Transactions();
      transactions.id = this.transactionsFormGroup.controls['id'].value;
  
      this.transactionsService.delete(transactions).subscribe((response)=>{
        console.log(JSON.stringify(response));
        this.result.emit(true);
        location.reload();
      },(err)=>{
        alert('error : '+JSON.stringify(err));
      })
    }
  
    cancelChanges(){
      this.result.emit(true);
    }
    
    updateData(){
      this.setDatatoForm(this.transactions);
    }
  
    setDatatoForm(transactions:Transactions){
      if(this.transactions){
      this.transactionsFormGroup.controls['id'].setValue(this.transactions.id);
      this.transactionsFormGroup.controls['type'].setValue(this.transactions.type);
      this.transactionsFormGroup.controls['amount'].setValue(this.transactions.amount);
      this.transactionsFormGroup.controls['amountsign'].setValue(this.transactions.amountsign);
  
      if (transactions.account) {
        this.account = transactions.account;
        this.transactionsFormGroup.controls['accnumbid'].setValue(this.transactions.account.accountNumber);
        // console.log('customer :' + this.customer.customernumber);
        // console.log('fg customer :' + this.accountFormGroup.controls['custnumbid'].value);
      }    
      }
    }
  
    prosesResultForm(resultForm) {
      if(resultForm) {
        this.setDatatoForm(this.transactions)
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

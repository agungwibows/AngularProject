import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Account } from '../account'
import { AccountService } from '../account.service'
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/customer/customer';
import { Router } from '@angular/router';
import swal from 'sweetalert2'


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})

// export class messageAPI {
//   status: number;
//   message: Date;
// }

export class AccountListComponent implements OnInit {
  custnumb: String;
  account: Account = new Account;
  ListAccount: Account[] = []; 
  showDetail: boolean = false;
  selectedAccount: Account = new Account();
  customer: Customer = new Customer;
  selectedCustomer: number;
  column:number;
  status:string;
  msg:string;
  @Output()
  resultPass = new EventEmitter()

  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const customer: string = params['customer'];
      if (customer==null){//checking untuk flag loadData yang akan dipanggil setelah crud
        this.selectedCustomer=0;
      }else{
        this.selectedCustomer = parseInt(customer);
      }
      this.loadData(customer);
    });
  }

  selectAccount(account: Account) {
    let copyAccount = new Account();
    copyAccount.accountNumber = account.accountNumber;
    copyAccount.openDate = account.openDate;
    copyAccount.balance = account.balance;
    copyAccount.customer = account.customer;
    this.selectedAccount = copyAccount;
    this.showDetail = true;
    console.log('data ini ' + copyAccount.customer)
  }

  addAccount(customer?) {
    console.log("customer param" + customer)
    let copyAccount = new Account();
    copyAccount.accountNumber = this.account.accountNumber;
    copyAccount.openDate = this.account.openDate;
    copyAccount.balance = this.account.balance;
    copyAccount.customer = customer;
    this.selectedAccount = copyAccount;
    this.showDetail = true;
    window.scrollBy(0, 2000);
  }

  loadData(customer?) {//untuk reload dengan data customer
    console.log('customer' + customer);
    this.accountService.getList(customer).subscribe((response) => {
      console.log(JSON.stringify(response['values']));
      this.status = JSON.stringify(response['status']);
      this.msg = JSON.stringify(response['message']);
      console.log(this.status)
      console.log(this.msg)
      this.custnumb = customer;
      Object.assign(this.ListAccount, response['values']);  
    //   if(this.status!='0'){
    //   this.getMsgAPI(this.msg)
    // }
    }, (err) => {
      alert('error : ' + JSON.stringify(err));
    })
  }

  loadDataAll() {//untuk reload tanpa data customer
    this.accountService.getList().subscribe((response) => {
      // console.log(JSON.stringify(response['values']));
      console.log(JSON.stringify(response['status']));
      console.log(JSON.stringify(response['message']));
      Object.assign(this.ListAccount, response['values']);
      Object.assign(this.status,response['status']);
      Object.assign(this.msg,response['message']);
      alert(this.msg);
      // if(this.status!=0){
      // this.getMsgAPI(this.message)
      // alert(this.message);
      // }
    }, (err) => {
      alert('error : ' + JSON.stringify(err));
    })
  }

  prosesResult(result) {
    if (result) {
      this.showDetail = false;
      if (this.selectedCustomer == 0) {
        this.loadDataAll()
      } else {
        this.loadData(this.selectedCustomer);
      }
    }
  }

  deleteData(account: Account) {
    this.accountService.delete(account).subscribe();
    location.reload();
    // this.loadDataAll()
    // this.prosesResult(true);
    // this.loadData(this.selectedCustomer);
  }

  viewTransactions(account: Account) {
    console.log('account' + account.accountNumber);
    this.route.navigate(['/transactions-list', { account: account.accountNumber }]);
  }

  myFunction() {
    this.activatedRoute.params.subscribe(params => {
      const customer: string = params['customer'];
      if(customer==null) {
        this.column=3;
      }else{
        this.column=0;
      }
    });

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[''+this.column];
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

  deleteRow(account: Account) {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      customClass: "animated tada"
    }).then((result) => {
      if (result.value) {
        swal(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        ).then(() => {
          this.deleteData(account);
        })
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  getMsgAPI(message:string){
    swal({
      type: 'error',
      title: 'Oops...',
      text: this.msg,
      // footer: '<a href>Why do I have this issue?</a>'
    })
  }
}

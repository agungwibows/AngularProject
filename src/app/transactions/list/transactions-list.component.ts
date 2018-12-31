import { Component, OnInit, EventEmitter,Output,Input } from '@angular/core';
import { Transactions } from '../transactions'
import { TransactionsService } from '../transactions.service'
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/account/account';
import  swal  from 'sweetalert2'


@Component({
  selector: 'app-transactions-list', 
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {
  ListTransactions: Transactions[] = [];
  showDetail: boolean = false;
  selectedTransactions: Transactions = new Transactions();
  selectedAccount:number;
  account: Account = new Account();
  column:number;
  constructor(
    private transactionsService: TransactionsService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const account: string = params['account'];
      console.log('account' + account)
      if (account==null){//checking untuk flag loadData yang akan dipanggil setelah crud
        this.selectedAccount=0;
      }else{
        this.selectedAccount = parseInt(account);
      }
      this.loadData(account);
    });
  } 

  selectTransactions(transactions: Transactions) {
    let copyTransactions = new Transactions();
    copyTransactions.id = transactions.id;
    copyTransactions.type = transactions.type;
    copyTransactions.amount = transactions.amount;
    copyTransactions.amountsign = transactions.amountsign;
    copyTransactions.account= transactions.account
    this.selectedTransactions = copyTransactions;
    this.showDetail = true;
    console.log('data ini' + copyTransactions.account.accountNumber)
  }
  
  addTransactions() {
    let copyTransactions = new Transactions();
    this.selectedTransactions = copyTransactions;
    this.showDetail = true;
    window.scrollBy(0, 1000);
  }
  
  loadData(account?){
    console.log('account'+ account);
    this.transactionsService.getList(account).subscribe((response)=>{
      console.log(JSON.stringify(response['values']));
      Object.assign(this.ListTransactions,response['values']);
    },(err)=>{
      alert('error : '+JSON.stringify(err));
    })
  }

  loadDataAll() {//untuk reload tanpa data customer
    this.transactionsService.getList().subscribe((response) => {
      console.log(JSON.stringify(response['values']));
      Object.assign(this.ListTransactions, response['values']);
    }, (err) => {
      alert('error : ' + JSON.stringify(err));
    })
  }

  prosesResult(result) {
    if(result) {
      this.showDetail=false;
      if (this.selectedAccount == 0) {
        this.loadDataAll()
      } else {
        this.loadData(this.selectedAccount);
      }
    }
  }

  deleteData(transactions: Transactions){
    this.transactionsService.delete(transactions).subscribe();
    location.reload();
  }

  myFunction() {
    this.activatedRoute.params.subscribe(params => {
      const account: string = params['account'];
      if(account==null) {
        this.column=5;
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

  deleteRow(transactions: Transactions){
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
          this.deleteData(transactions);
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
}

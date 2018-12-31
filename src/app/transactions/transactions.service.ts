import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transactions } from './transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private httpClient:HttpClient) { }

  getList(account?) {
    let params: String = '';
    if (account != null) {
      params = "?id="+account
    } 
      return this.httpClient.get('http://localhost:7000/api/transaction/transactions/' + params);
  }

  getListAccount(){
    return this.httpClient.get('http://localhost:7000/api/account/accounts/');
  }
   insert(transactions: Transactions) {
    return this.httpClient.post('http://localhost:7000/api/transaction', transactions);
   } 

  delete(transactions: Transactions) {
    return this.httpClient.delete('http://localhost:7000/api/transaction/'+ transactions.id);
  }

  update(transactions: Transactions){
    return this.httpClient.put('http://localhost:7000/api/transaction', transactions);
  }
}

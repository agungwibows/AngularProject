import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  getList(customer?) {
    let params: String = '';
    if (customer != null) {
      params = "?id="+customer
    } 
      return this.httpClient.get('http://localhost:7000/api/account/accounts/' + params);
  }

  getListCustomer() {
    return this.httpClient.get('http://localhost:7000/api/customer/customers');
  }

  insert(account: Account) {
    return this.httpClient.post('http://localhost:7000/api/account', account);
  }

  delete(account: Account) {
    return this.httpClient.delete('http://localhost:7000/api/account/' + account.accountNumber);
  }

  update(account: Account) {
    return this.httpClient.put('http://localhost:7000/api/account', account);
  }
}

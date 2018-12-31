import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer/list/customer-list.component';
import { AccountListComponent } from './account/list/account-list.component';
import { TransactionsListComponent } from './transactions/list/transactions-list.component'
import { AccountFormComponent } from './account/form/account-form.component';

const routes: Routes = [
  {
    path : 'CustomerList',
    component: CustomerListComponent
  },
  {
    path : 'AccountList',
    component: AccountListComponent
  },
  {
    path : 'TransactionsList',
    component: TransactionsListComponent
  },
  {
    path : 'account-list',
    component: AccountListComponent
  }, 
  {
    path : 'transactions-list',
    component: TransactionsListComponent
  }, 
  {
    path : 'account-form',
    component: AccountFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

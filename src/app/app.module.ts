import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerFormComponent } from './customer/form/customer-form.component';
import { CustomerListComponent } from './customer/list/customer-list.component';
import { AccountFormComponent } from './account/form/account-form.component';
import { AccountListComponent } from './account/list/account-list.component';
import { TransactionsFormComponent } from './transactions/form/transactions-form.component';
import { TransactionsListComponent } from './transactions/list/transactions-list.component';
import { EnigmaPipe } from './shared/enigma.pipe';
import { ComboCustomerComponent } from './shared/component/customer/combo-customer.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CustomerFormComponent,
    CustomerListComponent,
    AccountFormComponent,
    AccountListComponent,
    TransactionsFormComponent,
    TransactionsListComponent,
    EnigmaPipe,
    ComboCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

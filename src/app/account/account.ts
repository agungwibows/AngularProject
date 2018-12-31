import { Customer } from '../customer/customer';

export class Account {
    accountNumber: string;
    openDate: Date;
    balance: Number;
    customer: Customer;
    // custnumbid: Number= this.customer.customernumber;
}   
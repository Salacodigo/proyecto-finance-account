import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private http = inject( HttpClient )
  transactions = signal<Transaction[]>([])
  balanceValue = signal<number>(0);
  accountNumber = signal<string>('');

  

  constructor() { }

  onInit(){
    this.getTransactions()
    this.getBalance()
    this.getAccountNumber()

  }

  getTransactions(){
    const url = 'http://localhost:3000/transactions';
    this.http.get<Transaction[]>(url)
    .subscribe({
      next:
        ( transactions ) => {
          this.transactions.set( transactions)
      },
      error: () => {}
    });

    
  }

  getBalance(){
    const value = this.transactions()[0].balance
    if(value){
      this.balanceValue.set(value)
    }
    
  }

  getAccountNumber(){
    this.transactions().forEach(
      (transaction) => {
        if( transaction.type == 'Withdrawal' && this.accountNumber() == ''){
          this.accountNumber.set(transaction.source)
        }
      }
    )
  }
  



}

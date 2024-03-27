import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private http = inject( HttpClient )
  API_url = 'http://localhost:3000';
  transactions = signal<Transaction[]>([])
  balanceValue = signal<number>(-0.01);
  accountNumber = signal<string>('');

  

  constructor() { }

  async onInit(){    
    await this.getTransactions()
    await this.getBalance()
    await this.getAccountNumber()

  }

  getTransactions(){
    const url = `${this.API_url}/transactions`;
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
    if( this.transactions().length <= 0 ){ return }
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

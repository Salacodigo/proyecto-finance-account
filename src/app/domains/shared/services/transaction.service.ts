import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { Observable } from 'rxjs';


export interface transactionInterface {
    type : string,
    source : string,
    destination : string,
    amount : number,
    category : string,
    description : string
}


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
          const orderedTransactions = this.orderTransactionsByDate(transactions)
          this.transactions.set( orderedTransactions )
      },
      error: () => {}
    });
  }

  orderTransactionsByDate( transactions : Transaction[] ){
    const orderedTransactions = transactions.sort( (a : Transaction, b : Transaction) =>  {
      return b.date - a.date;
    });
    return orderedTransactions;
  }
  

  createTransaction( transactionData : transactionInterface ) : Observable<unknown> {
    const url = `${this.API_url}/transactions`;
    return this.http.post<unknown>(url, transactionData);
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

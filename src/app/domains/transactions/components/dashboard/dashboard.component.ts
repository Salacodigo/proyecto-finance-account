import { Component, inject, signal } from '@angular/core';
import AccountsComponent from '../../../accounts/accounts.component';
import { TransactionService } from '../../../shared/services/transaction.service';
import { CommonModule } from '@angular/common';

interface TransactionCounts {
  [key: string]: number;
}

interface TransactionTopAcount {
  [key: string]: { [key: string] : number  };
}

interface OrderArray {
  0: string,
  1: {[key: string] : number}
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AccountsComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

  transactionService = inject(TransactionService)
  transactions = this.transactionService.transactions;  

  transactionsQuantity = signal<number>(0);
  transactionsQuantityPerType = signal<[string, number][]>([])
  transactionsAmountPerCategory = signal<[string, number][]>([])
  transactionsFavoriteAccounts = signal<[string, { [key: string]: number; }][]>([])

  constructor(){
    this.getDashboardData()
  }

  ngOnInit(){
    this.getDashboardData()
  }

  getDashboardData(){
    this.transactionService.onInit();
    // Quantity of transactions
    this.getTransactionsQuantity();

    // Quantity of transactions per type
    this.getQuantityTransactionsPerType();
    
    // Quantity of amount per category
    this.getAmountPerCategory();
    
    // Top of destination accounts
    this.getFavoriteAccounts();
  }

  getTransactionsQuantity(){
    this.transactionsQuantity.set(this.transactions().length)
  }

  getQuantityTransactionsPerType(){
    const transactionsTypeObject : TransactionCounts = {  }

    this.transactions().forEach( (transaction) => {
      const key = transaction.type.toLowerCase()

      if( transactionsTypeObject.hasOwnProperty(key)){
        transactionsTypeObject[key]++;  
      } else {
        transactionsTypeObject[key] = 1;
      }
    })

    const objectToArray = Object.entries(transactionsTypeObject)

    this.transactionsQuantityPerType.set(objectToArray);
  }
  
  getAmountPerCategory(){
    const transactionsAmountObject : TransactionCounts = {  }
    
    this.transactions().forEach( (transaction) => {
      const key = transaction.category.toLowerCase()
      
      if( transactionsAmountObject.hasOwnProperty(key)){
        transactionsAmountObject[key] += transaction.amount ;  
      } else {
        transactionsAmountObject[key] = transaction.amount;
      }
    })

    const objectToArray = Object.entries(transactionsAmountObject)

    this.transactionsAmountPerCategory.set(objectToArray);
  }

  getFavoriteAccounts(){
    const transactionsFavoriteAccountsObject : TransactionTopAcount = {  }
    
    this.transactions().forEach( (transaction) => {
      const keyU = transaction.destination;
      if(!keyU){ return }
      const key = keyU.toLowerCase();
      const amountValue : number = transaction.amount;
      
      
      if( transactionsFavoriteAccountsObject.hasOwnProperty(key)){
        transactionsFavoriteAccountsObject[key]["amount"] += amountValue;
        transactionsFavoriteAccountsObject[key]["sentTransfers"] ++ ;
      } else {
        transactionsFavoriteAccountsObject[key] = {}
        transactionsFavoriteAccountsObject[key]["amount"] = amountValue;
        transactionsFavoriteAccountsObject[key]["sentTransfers"] = 1 ;
      }
    })

    const objectToArray = Object.entries(transactionsFavoriteAccountsObject)

    this.transactionsFavoriteAccounts.set(objectToArray)

  }

  
}
  

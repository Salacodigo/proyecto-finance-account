import { Component, inject, signal } from '@angular/core';
import AccountComponent from '../../../accounts/accounts.component';
import { TransactionService } from '../../../shared/services/transaction.service';
import { Transaction } from '../../../shared/models/transaction.model';
import { TransactionComponent } from '../transaction/transaction.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    AccountComponent,
    TransactionComponent,
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export default class TransactionListComponent {

  transactionService = inject(TransactionService)

  constructor(){}

  transactions = this.transactionService.transactions;
  balanceValue = this.transactionService.balanceValue;

  ngOnInit(){
    this.getTransactions()
  }
  
  getTransactions(){
    this.transactionService.onInit()
  }

}

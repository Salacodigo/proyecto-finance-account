
import { Router } from '@angular/router';
import { TransactionService } from '../../../shared/services/transaction.service';
import AccountComponent from '../../../accounts/accounts.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { Component, inject } from '@angular/core';


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

  router = inject(Router)

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

  goToCreateTransaction(){
    this.router.navigate(['/dashboard'])
    this.router.navigate(['/create-transaction'])
  }

}

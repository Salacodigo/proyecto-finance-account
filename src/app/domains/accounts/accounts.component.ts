import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TransactionService } from '../shared/services/transaction.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export default class AccountComponent {

  transactionService = inject(TransactionService)
  accountBalanceValue = this.transactionService.balanceValue;
  accountBankNumber = this.transactionService.accountNumber;

  constructor() {
    this.getAccountData()
  }

  ngOnInit() {
    this.getAccountData()
  }
  
  getAccountData() {
    this.transactionService.onInit(); 
    this.accountBalanceValue.set(this.transactionService.balanceValue())
    
    this.accountBankNumber.set( this.transactionService.accountNumber())
  }

}

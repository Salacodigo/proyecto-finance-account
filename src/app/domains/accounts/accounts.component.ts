import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  balanceValue = this.transactionService.balanceValue;
  accountNumber = this.transactionService.accountNumber;

  ngOnInit(){
    this.transactionService.onInit()
  }

}

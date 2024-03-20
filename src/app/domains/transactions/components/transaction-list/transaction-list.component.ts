import { Component } from '@angular/core';
import AccountComponent from '../../../accounts/accounts.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    AccountComponent,
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export default class TransactionListComponent {

}

import { Component, inject } from '@angular/core';
import AccountComponent from '../accounts/accounts.component';
import { TransactionService } from '../shared/services/transaction.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    AccountComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent {
  

}

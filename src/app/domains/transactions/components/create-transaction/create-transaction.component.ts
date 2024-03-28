import { Component, inject } from '@angular/core';
import AccountComponent from '../../../accounts/accounts.component';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from 'express';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [
    AccountComponent,
    TransactionFormComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.css'
})
export default class CreateTransactionComponent {
  
  

}

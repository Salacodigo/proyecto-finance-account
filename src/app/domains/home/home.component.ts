import { Component } from '@angular/core';
import TransactionListComponent from '../transactions/components/transaction-list/transaction-list.component';
import AccountsComponent from '../accounts/accounts.component';
import { RouterModule } from '@angular/router';
import LoginComponent from '../authentication/components/login/login.component';
import SignUpComponent from '../authentication/components/sign-up/sign-up.component';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LoginComponent,
    SignUpComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {

}

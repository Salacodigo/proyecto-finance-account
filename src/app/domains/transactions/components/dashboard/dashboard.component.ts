import { Component } from '@angular/core';
import AccountsComponent from '../../../accounts/accounts.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AccountsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

}

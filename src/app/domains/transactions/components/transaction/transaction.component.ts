import { Component, Input, signal } from '@angular/core';
import { Transaction } from '../../../shared/models/transaction.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

  @Input({ required: true }) transaction! : Transaction;

  type = signal<string>('');

  ngOnInit(){
    this.type.set(this.transaction.type)
  }


}

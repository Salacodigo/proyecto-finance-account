import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../../shared/services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent {

  router = inject(Router);
  
  authenticationService = inject(AuthenticationService)
  transactionService = inject(TransactionService)

  accountBalanceValue = this.transactionService.balanceValue;
  accountBankNumber = this.transactionService.accountNumber;
  
  formBuilder = inject(FormBuilder);
  createTransactionForm! : FormGroup;
  sourceControl!: FormControl;
  typeControl!: FormControl;
  amountControl!: FormControl;
  destinationControl!: FormControl;
  categoryControl!: FormControl;
  descriptionControl!: FormControl;
  
  formControlTypeDisabled = {
    withdrawal : true,
    source : true,
  }

  loadingValidation : boolean = false;
  currentDate = Date.now();



  constructor() {
    this.getAccountData()
  }

  ngOnInit(){
    this.getAccountData()
    this.createTransactionReactiveForm()
  }

  getAccountData() {
    this.transactionService.onInit(); 
    this.accountBalanceValue.set(this.transactionService.balanceValue())
    
    this.accountBankNumber.set( this.transactionService.accountNumber())
  }


  createTransactionReactiveForm(){

    this.typeControl = new FormControl(
      {
        value: 'Withdrawal',
        disabled: true
      }, [
      Validators.required,
      Validators.minLength(1),
    ])

    this.sourceControl = new FormControl({
      value: `${this.accountBankNumber()}`,
      disabled: true
    }, [
      Validators.required,
      Validators.minLength(1)
    ])

    this.destinationControl = new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])

    this.amountControl = new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])

    this.categoryControl = new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])

    this.descriptionControl = new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])

    this.createTransactionForm = this.formBuilder.group({
      typeControl: this.typeControl,
      sourceControl : this.sourceControl,
      destinationControl : this.destinationControl,
      amountControl : this.amountControl,
      categoryControl : this.categoryControl,
      descriptionControl : this.descriptionControl
    })
  }

  showTransactionList(){
    this.router.navigate(['/transaction-list'])
  }

  submitCreateTransactionForm(){
    this.createTransaction()
  }

  createTransaction(){
    const {
        typeControl,
        sourceControl,
        destinationControl,
        amountControl,
        categoryControl,
        descriptionControl
        
    } = this.createTransactionForm.getRawValue();

    const data = {
        type : typeControl,
        source : sourceControl,
        destination : destinationControl,
        amount : +amountControl as number,
        category : categoryControl,
        description : descriptionControl,
    }
    
    // POST
    this.transactionService.createTransaction( data )
    .subscribe( (response) => {
      console.log({response});
    })
    
    
  }

}

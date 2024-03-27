import { Component, inject } from '@angular/core';
import AccountComponent from '../../../accounts/accounts.component';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from 'express';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [
    AccountComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.css'
})
export default class CreateTransactionComponent {
  
  router = inject(Router);
  
  authenticationService = inject(AuthenticationService)
  
  formBuilder = inject(FormBuilder);

  createTransactionForm! : FormGroup;

  /*
  {
    "id": "440096e4-55de-4ecc-a1c8-c8011488d7f6",
    "type": "Withdrawal",
    "source": "7856 84 297 26",
    "destination": null,
    "amount": 223.49,
    "category": "Groceries",
    "description": "Spent USD 223.49 on Groceries",
    "status": "Success",
    "balance": 9776.51,
    "date": 1710778539480
  },
  */
  typeControl!: FormControl;
  sourceControl!: FormControl;
  destinationControl!: FormControl;
  amountControl!: FormControl;
  categoryControl!: FormControl;
  descriptionControl!: FormControl;
  statusControl!: FormControl;
  balanceControl!: FormControl;
  dateControl!: FormControl;


  loadingValidation : boolean = false;

  formControlTypeDisabled = {
    withdrawal : true,
    source : true,
    status: true,
    balance : true,
    date: true,
  }

  balanceEnough : boolean = false;


  ngOnInit(){
    this.createTransactionReactiveForm()
  }

  createTransactionReactiveForm(){

    this.typeControl = new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ])
    this.sourceControl = new FormControl('', [
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
    this.statusControl = new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])
    this.balanceControl = new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])
    this.dateControl = new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])


    this.createTransactionForm = this.formBuilder.group({
      typeControl: this.typeControl,
      sourceControl : this.sourceControl,
      destinationControl : this.destinationControl,
      amountControl : this.amountControl,
      categoryControl : this.categoryControl,
      descriptionControl : this.descriptionControl,
      statusControl : this.statusControl,
      balanceControl : this.balanceControl,
      dateControl : this.dateControl,
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
        descriptionControl,
        statusControl,
        balanceControl,
        dateControl,
    } = this.createTransactionForm.value;

    const data = {
        type : typeControl,
        source : sourceControl,
        destination : destinationControl,
        amount : amountControl,
        category : categoryControl,
        description : descriptionControl,
        status : statusControl,
        balance : balanceControl,
        date : dateControl,
    }
    
    // POST
    console.log({ data });
    
    /*
    this.authenticationService.signUp( data )
    .subscribe( (token) => {
      localStorage.setItem('access-token', token.toString() );
      this.router.navigate(['/transaction-list']);
    })
    */
  }

}

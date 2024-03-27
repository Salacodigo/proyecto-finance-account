import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export default class SignUpComponent {
  
  router = inject(Router);
  
  authenticationService = inject(AuthenticationService)
  
  formBuilder = inject(FormBuilder);

  signupForm! : FormGroup;

  firstNameControl!: FormControl;
  lastNameControl!: FormControl;
  emailControl!: FormControl;
  passwordControl!: FormControl;
  password2Control!: FormControl;


  loadingValidation : boolean = false;
  arePasswordsEqual : boolean = false;


  ngOnInit(){
    this.signupReactiveForm()
  }

  signupReactiveForm(){

    this.firstNameControl = new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])
    this.lastNameControl = new FormControl('',[
      Validators.required,
      Validators.minLength(1)
    ])
    this.emailControl = new FormControl('',[
      Validators.required,
      Validators.email
    ])
    this.passwordControl = new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(64),
    ])
    this.password2Control = new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(64),
    ])

    this.signupForm = this.formBuilder.group({
      firstNameControl: this.firstNameControl,
      lastNameControl: this.lastNameControl,
      emailControl: this.emailControl,
      passwordControl: this.passwordControl,
      password2Control: this.password2Control,
    })
  }

  showLoginForm(){
    this.authenticationService.showLoginForm();
    this.router.navigate(['/'])
  }


  submitSignUpForm(){
    if( !this.confirmPassword() ){ return }

    this.signUp()

  }

  confirmPassword(){
    const {password, password2} = this.signupForm.value;
    password === password2 ? 
    this.arePasswordsEqual = true :
    this.arePasswordsEqual = false
    
    return this.arePasswordsEqual;
  }

  signUp(){
    const { firstNameControl, lastNameControl, emailControl, passwordControl } = this.signupForm.value;
    const data = { 
      firstName: firstNameControl,
      lastName :lastNameControl, 
      email : emailControl, 
      password : passwordControl 
    };
    
    // POST
    this.authenticationService.signUp( data )
    .subscribe( (token) => {
      localStorage.setItem('access-token', token.toString() );
      this.router.navigate(['/transaction-list']);
    })
  }

}

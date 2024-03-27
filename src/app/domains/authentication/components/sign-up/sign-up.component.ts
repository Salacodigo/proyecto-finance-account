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
  
  authenticationService = inject(AuthenticationService)
  
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  signupForm! : FormGroup;

  firstNameControl!: FormControl;
  lastNameControl!: FormControl;
  emailControl!: FormControl;
  passwordControl!: FormControl;
  password2Control!: FormControl;


  loadingValidation : boolean = false;


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


  getRegisterFormValues(){
    console.log(this.signupForm.value);
  }

}

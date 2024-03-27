import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../../shared/services/token.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  
  router = inject(Router)

  athenticationService = inject(AuthenticationService);
  tokenService = inject(TokenService)
  
  formBuilder = inject(FormBuilder)
  
  loginForm! : FormGroup;

  emailControl!: FormControl;
  passwordControl!: FormControl;

  loadingValidation : boolean = false;



  ngOnInit(){
    this.loginReactiveForm()
  }


  showRegisterForm(){
    this.athenticationService.showRegisterForm();
  }

  
  loginReactiveForm(){

    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email
    ])
    this.passwordControl = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(64),
    ])
    
    this.loginForm = this.formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl,
    });
  }
  
  submitLoginForm(){
    this.signIn()
  }
  
  signIn(){  
    const { email, password } = this.loginForm.value;

    const data = { 
      email : email,
      password : password,
    };
  
    // POST
    this.athenticationService.signIn( data )
    .subscribe( (token) => {
      this.tokenService.saveToken(JSON.stringify( token.accessToken ))
      this.router.navigate(['/transaction-list']);
      
    })
  }
  
  
}
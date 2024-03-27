import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';



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
    console.log(this.loginForm.value);
    this.signIn()
  }
  
  signIn(){  
    console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;
    
    const data = { 
      email : email,
      password : password,
    };
    console.log({data});
    
  
    // POST
    this.athenticationService.signIn( data )
    .subscribe( (token) => {
      console.log({token});

      localStorage.setItem('access-token', token.toString() );
      this.router.navigate(['/transaction-list']);
      
    })
  }
  
  
}
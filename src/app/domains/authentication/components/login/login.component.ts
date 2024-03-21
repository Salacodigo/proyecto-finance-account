import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';



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

  login(){
    this.athenticationService.login()
  }

  loginReactiveForm(){
    this.emailControl = new FormControl('', [Validators.required, Validators.email])
    this.passwordControl = new FormControl('', [Validators.required])

    this.loginForm = this.formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl,
    });
  }

  getLoginFormValues(){
    console.log(this.loginForm.value);
  }
  

}

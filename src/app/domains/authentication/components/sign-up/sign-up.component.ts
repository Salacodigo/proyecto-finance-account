import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export default class SignUpComponent {


  authenticationService = inject(AuthenticationService)

  showLoginForm(){
    this.authenticationService.showLoginForm();
  }

}

import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  athenticationService = inject(AuthenticationService);


  showRegisterForm(){
    this.athenticationService.showRegisterForm();
  }

}

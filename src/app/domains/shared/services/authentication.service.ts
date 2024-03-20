import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isVisibleLoginForm = signal<boolean>(true);

  constructor() { }

  showRegisterForm(){
    this.isVisibleLoginForm.set(false);
  }
  
  showLoginForm(){
    this.isVisibleLoginForm.set(true);
  }


}

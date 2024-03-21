import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';


interface Credential {
  email : string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private http = inject( HttpClient );

  API_url = 'http://localhost:3000';

  isVisibleLoginForm = signal<boolean>(true);

  constructor() { }

  showRegisterForm(){
    this.isVisibleLoginForm.set(false);
  }
  
  showLoginForm(){
    this.isVisibleLoginForm.set(true);
  }

  login( credential : Credential = {
    "email": "john.smith82@gmail.com",
    "password": "1234",
  } ){
    const url = `${this.API_url}/profile`;
    this.http.get(url)
    .subscribe({
      next:
        ( data ) => {
          console.log( data );
      },
      error: () => {}
    });
    
  }


}

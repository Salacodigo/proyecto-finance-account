import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../models/response.login.model';


interface SignInCredential {
  email : string,
  password: string,
}

interface SingUpCredential {
  firstName : string, 
  lastName : string,
  email : string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService <T> {
  
  private http = inject( HttpClient );

  API_url = 'http://localhost:3000';

  isVisibleLoginForm = signal<boolean>(true);

  sessionToken = signal<string>("");

  constructor() { }

  showRegisterForm(){
    this.isVisibleLoginForm.set(false);
  }
  
  showLoginForm(){
    this.isVisibleLoginForm.set(true);
  }

  signIn( credential : SignInCredential) :  Observable<ResponseLogin> {
    const url = `${this.API_url}/signin`;
    return this.http.post<ResponseLogin>(url, credential);
  }


  signUp( credential : SingUpCredential ) : Observable<T> {
    const url = `${this.API_url}/signup`;
    return this.http.post<T>(url, credential )
  }


}

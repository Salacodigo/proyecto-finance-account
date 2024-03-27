import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Profile } from '../models/profile.model';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { ResponseProfile } from '../models/response.profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService <T> {

  profileDefault =  {
    id:        '',
    firstName: '',
    lastName:  '',
    email:     '',
    password:  '',
    accounts: ['']   
  }

  tokenService = inject(TokenService)

  private http = inject( HttpClient );
  API_url = 'http://localhost:3000';
  profile = signal< Profile >( this.profileDefault );


  constructor() {
    this.getProfileInformation()
  }

  getProfileInformation() : Observable<ResponseProfile> {
    const url = `${this.API_url}/users/profile`;
    const accessToken = this.tokenService.getToken()
    
    return this.http.get<ResponseProfile>(url)
  }
}

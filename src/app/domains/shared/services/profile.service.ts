import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profileDefault =  {
    id:        '',
    firstName: '',
    lastName:  '',
    username:  '',
    email:     '',
    password:  '',
    age:       0,
  }


  private http = inject( HttpClient );
  API_url = 'http://localhost:3000';
  profile = signal< Profile >( this.profileDefault );

  constructor() {
    this.getProfileInformation()
  }

  async getProfileInformation(){
    const url = `${this.API_url}/profile`;
    // const url = 'http://localhost:3000/profile';
    this.http.get<Profile>(url)
    .subscribe({
      next:
        ( profileInfo ) => {
          this.profile.set( profileInfo)
      },
      error: () => {}
    });

  }
}

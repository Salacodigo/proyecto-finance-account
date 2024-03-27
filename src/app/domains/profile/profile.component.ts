import { Component, inject } from '@angular/core';
import AccountComponent from '../accounts/accounts.component';
import { TransactionService } from '../shared/services/transaction.service';
import { ProfileService } from '../shared/services/profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    AccountComponent,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent {
  
  profileService = inject(ProfileService)
  profileInfo = this.profileService.profile;

  ngOnInit(){
    this.getProfileInfo();
  }

  getProfileInfo(){
    this.profileService.getProfileInformation()
    .subscribe( (info) => {

    this.profileService.profile.set( info )
    })
  }



}

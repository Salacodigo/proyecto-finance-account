import { Component, inject } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { TokenService } from '../../services/token.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLinkWithHref,
    RouterLinkActive

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  tokenService = inject(TokenService)

  logOut(){
    this.tokenService.removeToken()
  }

}

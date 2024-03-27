import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { AuthenticationService } from '../services/authentication.service';


export const authGuard = async () => {

    const router = inject(Router);
    const authenticationService = inject(AuthenticationService);

    const isLoggedIn = await  authenticationService.isLoggedIn()

    if( isLoggedIn ){ return true }

    return router.createUrlTree(['/'])
}
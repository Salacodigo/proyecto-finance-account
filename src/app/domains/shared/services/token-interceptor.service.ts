import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";


@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{

    tokenService = inject(TokenService)

    intercept(
        request: HttpRequest<unknown>, 
        next: HttpHandler
    ) : Observable<HttpEvent<unknown>> {
        console.log('Interceptor Class');
        return this.addToken(request, next);
    }
        

    private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
        const accessToken = this.tokenService.getToken();
        
        console.log('Interceptor Token', accessToken);
        
        if (accessToken) {
            const authRequest = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
            });
            return next.handle(authRequest);
        }
        return next.handle(request);
    }

}
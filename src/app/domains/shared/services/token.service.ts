import { Injectable } from "@angular/core";




@Injectable({
    providedIn: 'root'
})
export class TokenService{

    saveToken(token: string) {
        localStorage.setItem('access-token', token);
      }
    
    getToken() {
    const token = localStorage.getItem('access-token');
    if( !token ){ return }
    return JSON.parse(token);
    }

    removeToken() {
    localStorage.removeItem('access-token');
    }


}
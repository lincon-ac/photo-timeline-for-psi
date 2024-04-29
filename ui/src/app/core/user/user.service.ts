import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode'

import { TokenService } from '../token/token.service';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {

    private userSubject = new BehaviorSubject<User>(null);
    private userName: string;

    constructor(private tokenService: TokenService) {

        this.tokenService.hasToken() &&
            this.decodeAndNotify();
    }

    //setou o token
    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();     //pega o token que foi salvo
        const user = jwt_decode(token) as User; //decodifica o token e pega o valor do payload e transformei para User
        this.userName = user.name;  //pegando do payload do token e guardando ai
        this.userSubject.next(user); //para emitir ele através do usersubject
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
        this.userName = '';
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    getUserName() {
        return this.userName;
    }
}

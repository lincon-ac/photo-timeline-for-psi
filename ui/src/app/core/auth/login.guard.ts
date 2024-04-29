import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router) {}

    //acessa a rota, chama o canActivated
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

            if(this.userService.isLogged()){ //voce ta logado?
                this.router.navigate(['user', this.userService.getUserName()]) //joga voce para getusername
                return false; //pra dizer que a rota singUp nao será processada. Ai joga pra rota de exibir as fotos novamente
            }
            return true;
    }
}


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router) {}

    //acessei a rota, chama o canActivated
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

          if(!this.userService.isLogged()){
              this.router.navigate(
                  [''],
                  {
                      queryParams: {
                          fromUrl: state.url
                      }
                  }
              );
              return false;
          }
          return true;
      }
}

import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import * as StackTrace from "stacktrace-js";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { Router } from "@angular/router";

import { UserService } from "src/app/core/user/user.service";
import { ServerLogService } from "./server-log.service";
import { environment } from '../../../environments/environment'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector, private ngZone: NgZone) {

    }

    handleError(error: any): void {
      console.log('passei pelo handler');

      const location = this.injector.get(LocationStrategy);
      const userService = this.injector.get(UserService);
      const serverLogService = this.injector.get(ServerLogService);
      const zone = this.injector.get(NgZone);
      const router = this.injector.get(Router);

      const url = location instanceof PathLocationStrategy
            ? location.path()
            : '';

      const message = error.message
      ? error.message :
      error.toString();

      if(environment.production) zone.run(() => router.navigate(['/error']));

      StackTrace
          .fromError(error)
          .then(stackFrames => {
              const stackAsString = stackFrames
                  .map(sf => sf.toString())
                  .join('\n')

              console.log(message);
              console.log(stackAsString);
              console.log('o que será enviado para o servidor');

              serverLogService.log({
                message,
                url,
                userName: userService.getUserName(),
                stack: stackAsString}
            ).subscribe(
                () => console.log('Error logged on server'),
                err => {
                    console.log(err)
                    console.log('Falha ao enviar log de erros para server');
                }
            );
        });

    }
}


//não é interessante injetar artefatos no constructor do Global Errorhandler, pois o angular primeiro criará instâncias dessas dependências para depois injetá-las e, se algum erro acontecer durante a injeção o ErrorHandler não será capaz de tratá-lo. Nesse sentido, o ideal é injetar os artefatos no método com Injector.

//Zone é utilizado pelo Angular (por padrão) para realizar detecção de mudanças (change detection), ele é um mecanismo para interceptar e rastrear tarefas assíncronas.

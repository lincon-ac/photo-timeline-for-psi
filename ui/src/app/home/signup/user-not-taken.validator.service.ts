import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { switchMap, debounceTime, map, first } from 'rxjs/operators';

import { SignUpService } from './singup.service';

@Injectable()   //sem necessidade de usar o providedIn: 'root'
export class UserNotTakenValidatorService {

    constructor(private signUpService: SignUpService) {}

    checkUserNameTaken() { //retorna uma função de validação que vai ter acesso ao serviço

        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(userName => //o valor digitado será capturado no switch map e passado para o checkusernametaken
                    this.signUpService.checkUserNameTaken(userName)
                ))
                .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
                .pipe(first());

        }
    }
}

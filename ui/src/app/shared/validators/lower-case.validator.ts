import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator(control: AbstractControl) {

    if(!isLowerCase(control.value)) {
        return { lowerCase: true }//a nome de variavel 'lowerCase' tem que bater com o chamado no html do signup
    }
    return null;
}

export function isLowerCase(value:string) {
  return value.trim() && /^[a-z0-9_\-]+$/.test(value);
}

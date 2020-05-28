import { Directive } from '@angular/core';
import {
  ReactiveFormsModule,
  NG_VALIDATORS,
  FormsModule,
  FormGroup,
  FormControl,
  ValidatorFn,
  Validator
} from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[passwordvalidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidatePasswordDirective,
      multi: true
    }
  ]
})
export class ValidatePasswordDirective implements Validator {
  validator: ValidatorFn;
  constructor() {
    this.validator = this.passwordValidator();
  }
  validate(c: FormControl) {
    return this.validator(c);
  }
  passwordValidator(): ValidatorFn {
    return (c: FormControl) => {
      const password = (c.value == null) ? '' : c.value;
      const isValid = password.match('^(?=.*[a-zA-Z])(?=.*[0-9])');
      if (isValid) {
        console.log('false');
        return null;
      } else {
        console.log('true');
        return {
          passwordvalidator: {
            valid: false
          }
        };
      }
    };
  }
}

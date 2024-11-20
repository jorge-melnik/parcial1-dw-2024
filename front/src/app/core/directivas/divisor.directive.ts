import { Directive, input, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appDivisor]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DivisorDirective,
      multi: true,
    },
  ],
})
export class DivisorDirective implements Validator {
  // @Input('appDivisor')
  // divisor = '1';
  appDivisor = input<number>(1);

  validate(control: AbstractControl): ValidationErrors | null {
    try {
      const valorActual: number = parseInt(control.value);
      const divisor = this.appDivisor();
      return valorActual % divisor === 0
        ? null
        : { divisor: { divisor: divisor, dividendo: valorActual } };
    } catch (error: unknown) {
      console.error(error);
      return null;
    }
  }
}

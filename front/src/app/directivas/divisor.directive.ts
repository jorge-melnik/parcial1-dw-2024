import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appDivisor]',
  standalone: true,
})
export class DivisorDirective implements Validator {
  @Input('appDivisor')
  divisor = '1';

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('VALIDATE');
    try {
      const valorActual: number = parseInt(control.value);
      const divisor = parseInt(this.divisor);
      return valorActual % divisor ? null : { divisor: { divisor: divisor } };
    } catch (error: unknown) {
      console.error(error);
      return null;
    }
  }

  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }
}

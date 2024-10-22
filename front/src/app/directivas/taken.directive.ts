import { Directive, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[appTaken]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => TakenDirective),
      multi: true,
    },
  ],
})
export class TakenDirective implements AsyncValidator {
  @Input('appTaken')
  taken = '1';

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    console.log('VALIDATE: ', control.value);
    return { taken: true };
  }

  registerOnValidatorChange?(fn: () => void): void {
    console.log('FN: ', fn);
  }
}

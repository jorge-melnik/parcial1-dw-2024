import { Directive, forwardRef, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { ApiService } from '../../shared/servicios/api.service';

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
  _apiService = inject(ApiService);
  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    const valor = control.value;
    if (valor === 'pedro') {
      return { taken: true };
    }
    return null;
  }
}

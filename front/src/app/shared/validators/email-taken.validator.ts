import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class EmailTakenValidator implements AsyncValidator {
  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    const email = control.value;
    if (email === 'j@j.com')
      return {
        isEmailTaken: true,
      };
    return null;
  }
}

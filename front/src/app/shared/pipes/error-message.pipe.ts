import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorMessage',
  standalone: true,
})
export class ErrorMessagePipe implements PipeTransform {
  transform(
    errors: ValidationErrors | null | undefined,
    controlName: string,
  ): string | undefined {
    if (!errors) return;
    if (errors['required']) return `El campo ${controlName} es requerido.`;
    if (errors['requiredTrue']) return `Es obligatorio marcar ${controlName}.`;
    if (errors['minlength'])
      return `El largo mínimo es ${errors['minlength'].requiredLength}.`;
    if (errors['notValidEmail'] || errors['email'])
      return `Este no es un email válido.`;
    if (errors['largo']) return 'El largo no es correcto';
    if (errors['valueMatchWith'])
      return `El valor debe ser igual a ${errors['valueMatchWith'].field2Name}.`;
    return 'El valor no es correcto.';
  }
}

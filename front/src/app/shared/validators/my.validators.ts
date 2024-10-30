import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

function getControlName(control: AbstractControl): string | null {
  const parent = control.parent as FormGroup;
  return parent
    ? Object.keys(parent.controls).find(
        (name) => parent.controls[name] === control,
      ) || null
    : null;
}

/**
 * Validator function for checking if the value of a form field matches the value of another specified field.
 * @param field2Name The name of the form field to compare the value with.
 * @returns Validator function (recibe un FormControl)
 */
export function valueMatchWith(field2Name: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fieldValue1: string | null = control.value;
    const fieldValue2: string | null = control.parent?.get(field2Name)?.value;
    const field1Name: string | null = getControlName(control);
    if (!field1Name) return null;
    if (fieldValue1 !== fieldValue2)
      return {
        valueMatchWith: {
          field1Name,
          field2Name,
        },
      };
    return null;
  };
}

/**
 * Validator function for checking if two form fields have matching values.
 * @param field1Name The name of the first form field.
 * @param field2Name The name of the second form field.
 * @returns Validator function. Este validator function recibe un FormGroup
 */
export function valuesMatch(
  field1Name: string,
  field2Name: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fieldValue1: string | null = control.get(field1Name)?.value;
    const fieldValue2: string | null = control.get(field2Name)?.value;
    if (fieldValue1 !== fieldValue2)
      return {
        valuesMatch: {
          field1Name,
          field2Name,
        },
      };
    return null;
  };
}

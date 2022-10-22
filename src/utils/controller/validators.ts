import { ValidatorFn, Validators } from '@angular/forms';
import { GodzillaFormControls } from '@godzilla-forms/core';

/**
 * private function to be used only by GodzillaFormsParserComponent to return the form control validators list
 * @param control
 * Return: List of ValidatorFn
 */
export function controlValidators(control: GodzillaFormControls): ValidatorFn[] {
  if (!control.validators) {
    return [];
  }
  const validatorsToAdd: ValidatorFn[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(control.validators)) {
    switch (key) {
      case 'min':
        validatorsToAdd.push(Validators.min(value));
        break;
      case 'max':
        validatorsToAdd.push(Validators.max(value));
        break;
      case 'required':
        if (value) {
          validatorsToAdd.push(Validators.required);
        }
        break;
      case 'email':
        if (value) {
          validatorsToAdd.push(Validators.email);
        }
        break;
      case 'minLength':
        validatorsToAdd.push(Validators.minLength(value));
        break;
      case 'maxLength':
        validatorsToAdd.push(Validators.maxLength(value));
        break;
      case 'pattern':
        validatorsToAdd.push(Validators.pattern(value));
        break;
      default:
        break;
    }
  }
  return validatorsToAdd;
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkIfTermsAreAccepted(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value ? null : { acceptTerms: { value: control.value } };
  };
}

export function checkIfPasswordsMatch(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.get('password');
    const confirmPwd = control.parent?.get('confirmPwd');
    const confirmPassword = password?.value === confirmPwd?.value;
    return confirmPassword
      ? null
      : { confirmPwd: { value: 'Passwords do not match' } };
  };
}
export function categoryIsNotUnassigned(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const category = control.parent?.get('category');
    if (category?.value.name === 'unassigned') {
      return { category: { value: 'Category is unassigned' } };
    }    
    return null
  };
}

export function formValidator(
  password: string,
  confirmPwd: string
): ValidatorFn {
  return (control: AbstractControl) => {
    const passwordControl = control.get(password);
    const confirmPwdControl = control.get(confirmPwd);
    if (passwordControl && confirmPwdControl) {
      if (passwordControl.value !== confirmPwdControl.value) {
        const error = { confirmPwd: { value: 'Passwords do not match' } };
        confirmPwdControl.setErrors(error);
        return error;
      }
    }
    confirmPwdControl?.setErrors(null);
    return null;
  };
}

export function attributeFormValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const baseAmount = control.get('baseAmount')?.value
    const maxAmount = control.get('maxAmount')?.value
    return baseAmount > maxAmount ? {
      baseAmountGreater: { value: 'Base amount is greater than max amount'}
    } : null
  }
}

export function unitRequiredIfMeasured(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isMeasured = control.get('isMeasured')?.value
    const unit = control.get('unit')?.value
    return isMeasured && !unit ? {
      unit: { value: 'Unit is required for a measured attribute'}
    } : null
  }
}

export function requiredWhenIsMeasured(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isMeasured = control.parent?.parent?.get('isMeasured')?.value
    console.log('IsMeasured', isMeasured);
    
    if (isMeasured) {
      return null
    }
    return { }
  }
}
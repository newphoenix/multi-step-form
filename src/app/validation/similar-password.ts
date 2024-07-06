import { AbstractControl, ValidatorFn } from "@angular/forms";

export const similarPassword: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {

  const password = control.get("password");
  const repassword = control.get("repassword");

  if (password?.pristine || repassword?.pristine) return null;

  return password?.value != repassword?.value ? { mismatch: true } : null;

}


export const match = (controlName: string, matchingControlName: string, errorName: string): ValidatorFn => {

  return (group: AbstractControl) => {
    const control = group.get(controlName);
    const matchingControl = group.get(matchingControlName);

    if (control?.pristine || matchingControl?.pristine) return null;

    return control?.value != matchingControl?.value ? { [errorName]: true } : null;
  }
} 
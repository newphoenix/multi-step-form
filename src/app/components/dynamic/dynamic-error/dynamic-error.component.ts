import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationMessage } from '../../../interfaces/validation-message';
import { SpecialRuleError } from '../../../interfaces/special-rule-error';

@Component({
  selector: 'app-dynamic-error',
  templateUrl: './dynamic-error.component.html',
  styleUrl: './dynamic-error.component.css'
})
export class DynamicErrorComponent {

  formName = input.required<FormGroup<any>>();
  fieldName = input.required<string>();
  validationMessages = input.required<Map<string, Map<string, ValidationMessage>>>();
  specialValidationMessages = input<Map<string, SpecialRuleError[]>>();

  get formNameControl() {
    return this.formName().controls[this.fieldName()];
  }

  getKeys(map): string[] {
    return Array.from(map().keys());
  }

  getFieldCrossErrors(field): SpecialRuleError[] | undefined {
    return this.specialValidationMessages()?.get(field);
  }

}

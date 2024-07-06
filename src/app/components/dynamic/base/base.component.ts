import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationMessage } from '../../../interfaces/validation-message';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {

  field = input.required<any>();
  formName = input.required<FormGroup<any>>();
  validationMessages = input.required<Map<string, Map<string, ValidationMessage>>>();


  get formNameControl() {
    return this.formName().controls[this.field().fieldName];
  }

}

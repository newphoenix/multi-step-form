import { Component } from '@angular/core';
import { FormArray } from '@angular/forms';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-dynamic-checkbox',
  templateUrl: './dynamic-checkbox.component.html',
  styleUrl: './dynamic-checkbox.component.css'
})
export class DynamicCheckboxComponent extends BaseComponent {

  constructor() {
    super();
  }

  get checkboxes() {
    return this.formName().controls[this.field().fieldName] as FormArray;
  }


}

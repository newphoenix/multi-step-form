import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationMessage } from '../../../interfaces/validation-message';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-dynamic-select',
  templateUrl: './dynamic-select.component.html',
  styleUrl: './dynamic-select.component.css'
})
export class DynamicSelectComponent extends BaseComponent {

  constructor() {
    super();
  }


}

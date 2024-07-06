import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationMessage } from '../../../interfaces/validation-message';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-dynamic-radio',
  templateUrl: './dynamic-radio.component.html',
  styleUrl: './dynamic-radio.component.css'
})
export class DynamicRadioComponent extends BaseComponent {

  constructor() {
    super();
  }


}

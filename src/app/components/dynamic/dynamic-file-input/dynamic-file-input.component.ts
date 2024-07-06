import { Component, ElementRef, input, OnInit, output } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormControl, ValidationErrors } from '@angular/forms';
import { SpecialRuleError } from '../../../interfaces/special-rule-error';
import { FileOutput } from '../../../interfaces/file-output';

@Component({
  selector: 'app-dynamic-file-input',
  templateUrl: './dynamic-file-input.component.html',
  styleUrl: './dynamic-file-input.component.css'
})
export class DynamicFileInputComponent extends BaseComponent {

  fileFieldData = output<FileOutput>();
  specialValidationMessages = input<Map<string, SpecialRuleError[]>>();

  constructor(public elRef: ElementRef) {
    super();
  }

  formHasErrors(): ValidationErrors | null {
    let keyArray = Array.from(this.specialValidationMessages()!.keys());
    let specialRuleErrors: SpecialRuleError[] = this.specialValidationMessages()?.get(this.field().fieldName) ?? [];

    let formHasError = specialRuleErrors.find(element => {
      return this.formName().errors?.[element.errorName]
    })

    return (keyArray.includes(this.field().fieldName) && (formHasError)) ? { [formHasError.errorName]: true } : null;
  }

  fieldFormControl(fieldName: string) { return this.formName().get(fieldName) as FormControl; }

  fileName(fieldName: string) {
    return this.formName().controls[fieldName].value.name;
  }

  clickFileInput() {
    let element = document.getElementById(this.field().fieldName) as HTMLElement;
    element.click();
  }

  captureFile($event) {
    if ($event.target.files.length == 1) {
      const file: File = $event.target.files[0]
      let fileOutput: FileOutput = { fieldKey: this.field().fieldName, file: file };
      this.fileFieldData.emit(fileOutput)
    }

  }

}

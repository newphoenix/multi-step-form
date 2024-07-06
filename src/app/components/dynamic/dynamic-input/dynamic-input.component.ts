import { Component, ElementRef, input, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, ValidationErrors } from "@angular/forms";
import { BaseComponent } from '../base/base.component';
import { SpecialRuleError } from '../../../interfaces/special-rule-error';



@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrl: './dynamic-input.component.css'
})
export class DynamicInputComponent extends BaseComponent implements OnInit {




  specialValidationMessages = input<Map<string, SpecialRuleError[]>>();

  constructor(private formBuilder: FormBuilder, public elRef: ElementRef) {
    super();
  }
  ngOnInit(): void {
    //console.log(this.field()+' : '+this.specialValidationMessages())
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
  fieldFormArray(fieldName: string): FormArray {
    return this.formName().get(fieldName) as FormArray;
  }

  deleteRow(index: number, fieldName: string) {
    (this.formName().get(fieldName) as FormArray).removeAt(index);
  }

  addROW(fieldName: string) {
    this.fieldFormArray(fieldName).push(this.formBuilder.control(''));
  }




}

import { AfterViewInit, Component, ElementRef, input, OnInit, output, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ValidationMessage } from '../../../interfaces/validation-message';
import { SpecialRuleError } from '../../../interfaces/special-rule-error';
import * as funs from '../../../validation/similar-password';
import { ValidatorNames } from '../../../enums/validator-names';
import { FileOutput } from '../../../interfaces/file-output';
import { DynamicFileInputComponent } from '../../dynamic/dynamic-file-input/dynamic-file-input.component';

@Component({
  selector: 'app-form-wizzard',
  templateUrl: './form-wizzard.component.html',
  styleUrl: './form-wizzard.component.css'
})
export class FormWizzardComponent implements OnInit {

  structure = input<any>();
  formSubmit = output<any>();

  showStep: boolean[] = [];
  stepNumber: number = 0;
  FileMap = new Map<String, File>();

  form!: FormGroup;
  steps: {}[] = []; //-- hold steps with fields
  fields: any = [];
  validationMessages = new Map<string, Map<string, ValidationMessage>>();
  specialValidationMessages = new Map<string, SpecialRuleError[]>();


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    Object.keys(this.structure()?.['steps']).forEach((key, index) => {
      this.steps[key] = this.structure()['steps'][key];
    })

    this.stepsKeys.forEach((key, i) => this.showStep[i] = false);
    this.showStep[0] = true;

    const formGroupStepsGroups = this.getFormControlsFields();
    this.form = this.formBuilder.group(formGroupStepsGroups);

  }

  get stepsKeys(): string[] {
    return Object.keys(this.steps);
  }

  fieldsKeys(stepKey): string[] {
    return Object.keys(this.steps[stepKey]['fields']);
  }

  fieldInStep(stepKey: string, fieldKey: string) {

    let fieldProps = this.steps[stepKey]['fields'][fieldKey];
    return { ...fieldProps, fieldName: fieldKey };
  }

  formGroupControlX(stepKey): FormGroup {
    return this.form.get(stepKey) as FormGroup;
  }

  isGroupValid(): boolean {

    if (!this.form.get(this.stepsKeys[this.stepNumber])?.valid) {
      this.form.get(this.stepsKeys[this.stepNumber])?.markAllAsTouched();
      return false;
    }

    return true;

  }

  setFormFileField(fileOutput: FileOutput) {
    this.form.get(this.stepsKeys[this.stepNumber])?.['controls']?.[fileOutput.fieldKey].setValue(fileOutput.file)
    this.FileMap.set(fileOutput.fieldKey, fileOutput.file)
  }

  next() {

    // if STEP in the form is NOT valid then show error messages
    if (!this.isGroupValid()) { return; }

    this.showStep[this.stepNumber] = false;

    this.stepNumber =
      this.stepNumber == this.showStep.length - 1 ? this.stepNumber : ++this.stepNumber;
    this.showStep[this.stepNumber] = true;

  }

  previous() {

    // if STEP in the form is NOT valid then show error messages
    if (!this.isGroupValid()) { return; }

    this.showStep[this.stepNumber] = false;
    this.stepNumber = this.stepNumber == 0 ? this.stepNumber : --this.stepNumber;
    this.showStep[this.stepNumber] = true;

  }

  onSubmit() {
    this.formSubmit.emit(this.form.value);
  }

  getFormControlsFields(): {} {

    const formGroupStepsGroups = {};

    this.stepsKeys.forEach((key, index) => {

      const formGroupFields = {};
      let fields: any = this.steps[key]['fields'];


      Object.keys(fields).forEach((field) => {

        const fieldProps = fields[field];
        const validators = this.addValidators(fieldProps.rules, field, fieldProps.label);

        if (fieldProps.type === 'checkbox') {
          let array = fieldProps.options.map(e => new FormControl(e.value));
          formGroupFields[field] = new FormArray(array, this.minSelectedCheckboxes(fieldProps.rules[ValidatorNames.minLength]));
        }
        else {
          formGroupFields[field] = 'array' in fieldProps && fieldProps.type === 'text' ? this.formBuilder.array(fieldProps.value?.length > 0 ? fieldProps.value.map(e => new FormControl(e)): ['']) :  [fieldProps.value,validators];
        };

        this.fields.push({ ...fieldProps, fieldName: field });

      });

      const formLevelValidation: ValidatorFn[] = [];
      const crossFieldValidation: [] = this.steps[key].cross_field_validation;

      if (crossFieldValidation) {
        crossFieldValidation.forEach(element => {
          formLevelValidation.push(...this.addFormGroupLevelValidators(element));
        });
      }

      formGroupStepsGroups[key] = this.formBuilder.group(formGroupFields, { validators: formLevelValidation });

    });




    return formGroupStepsGroups;
  }

  private addValidators(rules: string[], fieldName: string, fieldLabel: string) {

    if (!rules) { return []; }

    const validators = Object.keys(rules).map((rule) => {

      switch (rule) {
        case ValidatorNames.required: {
          this.addValidationMessage(fieldName, ValidatorNames.required, `${fieldLabel} is required`);
          return Validators.required;
        }
        case ValidatorNames.minLength: {
          this.addValidationMessage(fieldName, ValidatorNames.minLength, `${fieldLabel} min length should be ${rules[ValidatorNames.minLength]} characters`);
          return Validators.minLength(rules[ValidatorNames.minLength]);
        }
        case ValidatorNames.maxLength: {
          this.addValidationMessage(fieldName, ValidatorNames.maxLength, `${fieldLabel} max length should be ${rules[ValidatorNames.maxLength]} characters`);
          return Validators.maxLength(rules[ValidatorNames.maxLength]);
        }
        case ValidatorNames.email: {
          this.addValidationMessage(fieldName, ValidatorNames.email, `Please enter a correct email format`);
          return Validators.email;
        }
        case ValidatorNames.min: {
          this.addValidationMessage(fieldName, ValidatorNames.min, `${fieldLabel} min value should be ${rules[ValidatorNames.min]}`);
          return Validators.min(rules[ValidatorNames.min]);
        }
        case ValidatorNames.max: {
          this.addValidationMessage(fieldName, ValidatorNames.max, `${fieldLabel} max value should be ${rules[ValidatorNames.max]}`);
          return Validators.max(rules[ValidatorNames.max]);
        }
        case ValidatorNames.pattern: {
          this.addValidationMessage(fieldName, ValidatorNames.pattern, `${rules[ValidatorNames.pattern].msg}`);
          return Validators.pattern(rules[ValidatorNames.pattern].regex);
        }
        default: { throw new Error('NoMatchFoundError') };
      }

    });

    return validators;
  }
  addFormGroupLevelValidators(specialRule: Object): ValidatorFn[] {

    let functionName: string = specialRule['function'];
    let validationFn: ValidatorFn[] = [];

    switch (functionName) {
      case 'match': {
        let args: Parameters<typeof funs.match> = specialRule['parameters'];
        validationFn.push(funs.match(...args));

        specialRule['inputs'].forEach(input => {
          let fieldValidationArray = this.specialValidationMessages.get(input) ?? [];
          fieldValidationArray.push({ errorName: specialRule['errorName'], errorMsg: specialRule['errorMsg'] })
          this.specialValidationMessages.set(input, fieldValidationArray);
        })

      }
    }

    return validationFn;
  }

  addValidationMessage = (fieldName: string, type: string, message: string) => {
    let fieldMap = this.validationMessages.get(fieldName) ?? new Map<string, ValidationMessage>();
    fieldMap?.set(type, { msg: message });
    this.validationMessages.set(fieldName, fieldMap);
  }

  minSelectedCheckboxes = (min: number = 1): ValidatorFn => {

    const validator: ValidatorFn = (formArray: AbstractControl) => {

      const totalSelected = (formArray as FormArray).controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };

    };

    return validator;
  }

}

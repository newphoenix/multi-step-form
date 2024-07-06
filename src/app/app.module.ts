import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormMultistepComponent } from './components/form-multistep/form-multistep.component';
import { FormWizzardComponent } from './components/form-multistep/form-wizzard/form-wizzard.component';
import { DynamicCheckboxComponent } from './components/dynamic/dynamic-checkbox/dynamic-checkbox.component';
import { DynamicErrorComponent } from './components/dynamic/dynamic-error/dynamic-error.component';
import { DynamicFileInputComponent } from './components/dynamic/dynamic-file-input/dynamic-file-input.component';
import { DynamicInputComponent } from './components/dynamic/dynamic-input/dynamic-input.component';
import { DynamicRadioComponent } from './components/dynamic/dynamic-radio/dynamic-radio.component';
import { DynamicSelectComponent } from './components/dynamic/dynamic-select/dynamic-select.component';
import { DynamicTextareaComponent } from './components/dynamic/dynamic-textarea/dynamic-textarea.component';

@NgModule({
  declarations: [
    AppComponent,
    FormMultistepComponent,
    FormWizzardComponent,
    DynamicCheckboxComponent,
    DynamicErrorComponent,
    DynamicFileInputComponent,
    DynamicInputComponent,
    DynamicRadioComponent,
    DynamicSelectComponent,
    DynamicTextareaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

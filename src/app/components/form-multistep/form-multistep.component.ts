import { Component, OnInit } from '@angular/core';
import { MultiStepService } from '../../services/multi-step.service';

@Component({
  selector: 'app-form-multistep',
  templateUrl: './form-multistep.component.html',
  styleUrl: './form-multistep.component.css'
})
export class FormMultistepComponent implements OnInit {

  structure: {} = {};

  constructor(private multiStepServ: MultiStepService) { }
  ngOnInit(): void {
    this.multiStepServ.getMultiStepModel()
      .subscribe({ next: (resp) => this.structure = resp });
  }

  formSubmit(event) {
    console.log(event);
  }

}

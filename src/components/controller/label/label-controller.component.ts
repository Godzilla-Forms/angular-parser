import { Component, Input, OnInit } from '@angular/core';
import { GodzillaFormControls } from '@godzilla-forms/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'godzilla-forms-label-controller',
  templateUrl: './label-controller.component.html'
})
export class LabelControllerComponent implements OnInit {


  // @ts-ignore
  @Input() control: GodzillaFormControls;

  constructor(public controlContainer: ControlContainer) {
  }

  ngOnInit() {
  }

}

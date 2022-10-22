import { Component, Input, OnInit } from '@angular/core';
import { GodzillaFormControls } from '@godzilla-forms/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'godzilla-forms-heading-controller',
  templateUrl: './heading-controller.component.html'
})
export class HeadingControllerComponent implements OnInit {


  // @ts-ignore
  @Input() control: GodzillaFormControls;

  constructor(public controlContainer: ControlContainer) {
  }

  ngOnInit() {
  }

}

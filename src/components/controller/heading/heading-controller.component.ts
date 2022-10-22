import { Component, Input } from '@angular/core';
import { GodzillaFormControls } from '@godzilla-forms/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'godzilla-forms-heading-controller',
  templateUrl: './heading-controller.component.html',
})
export class HeadingControllerComponent {
  // @ts-ignore
  @Input() control: GodzillaFormControls;

  constructor(public controlContainer: ControlContainer) {}
}

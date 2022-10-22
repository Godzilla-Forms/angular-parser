import { Component, Input, OnInit } from '@angular/core';
import { GodzillaFormControls } from '@godzilla-forms/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { labelPosition } from '../../../utils/controller';

@Component({
  selector: 'godzilla-forms-radio-controller',
  templateUrl: './radio-controller.component.html'
})
export class RadioControllerComponent implements OnInit {

  // @ts-ignore
  @Input public controlName: string;
  // @ts-ignore
  public form: FormGroup;
  // @ts-ignore
  @Input() control: GodzillaFormControls;
  @Input() submitted = false;

  constructor(public controlContainer: ControlContainer) {
  }

  ngOnInit() {
    this.form = <FormGroup>this.controlContainer.control;
  }

  _getLabelPosition(item: GodzillaFormControls) {
    return labelPosition(item);
  }

}

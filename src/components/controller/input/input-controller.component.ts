import { Component, Input, OnInit } from '@angular/core';
import { GodzillaFormControls, GodzillaItemTypes } from '@godzilla-forms/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { labelPosition } from '../../../utils/controller';

@Component({
  selector: 'godzilla-forms-input-controller',
  templateUrl: './input-controller.component.html'
})
export class InputControllerComponent implements OnInit {

  // @ts-ignore
  @Input public controlName: string;

  // @ts-ignore
  public form: FormGroup;

  // @ts-ignore
  @Input() control: GodzillaFormControls;

  @Input() submitted = false;

  labelPosition = labelPosition;

  constructor(public controlContainer: ControlContainer) {
  }

  ngOnInit() {
    this.form = <FormGroup>this.controlContainer.control;
  }

  /**
   * Internal function to update the status of checkbox,
   * This function is workaround since reactive form cannot update the status of checkbox
   * @param item: GodzillaFormControls
   * @param event: input event as row value
   * @private
   */
  changeStatus(item: GodzillaFormControls, event: any) {
    if (item.type !== GodzillaItemTypes.checkbox) {
      return;
    }
    const controller = this.form.get(item.id)!!;
    controller.setValue(event.target.checked);
  }


}

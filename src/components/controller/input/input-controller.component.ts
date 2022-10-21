import { Component, Input, OnInit } from '@angular/core';
import { GodzillaFormControls, GodzillaItemTypes } from '@godzilla-forms/core';
import { ControlContainer, FormGroup } from '@angular/forms';

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
  _changeStatus(item: GodzillaFormControls, event: any) {
    if (item.type !== GodzillaItemTypes.checkbox) {
      return;
    }
    let _controller = this.form.get(item.id)!!;
    _controller.setValue(event.target.checked);
  }

}

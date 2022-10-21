import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GodzillaLoaderService} from "../utils/services/loader.service";
import {GodzillaFormControls, GodzillaItemTypes, GodzillaValueSource} from '@godzilla-forms/core'
import {controlCssClass, controlFlow, controlValidators} from "../utils/controller";


declare type LabelPosition = "top" | "bottom" | "none";

@Component({
  selector: 'godzilla-forms-parser',
  templateUrl: './form-parser.component.html',
  styleUrls: ['./form-parser.component.scss']
})
export class GodzillaFormsParserComponent implements OnChanges {
  @Input() jsonForm: GodzillaFormControls[] = []
  @Input() enableGridSystem: boolean = true
  @Output()
  readonly validData: EventEmitter<any> = new EventEmitter<any>();
  _submitted = false;
  readonly form: FormGroup = this._formBuilder.group({});

  constructor(private _formBuilder: FormBuilder,
              private _godzillaLoader: GodzillaLoaderService) {
  }


  ngOnChanges(changes: SimpleChanges) {
    this.createForm(this.jsonForm);
  }

  /**
   * Internal function to detect the label position based on control type
   * @param item
   * @private
   */
  _labelPosition(item: GodzillaFormControls): LabelPosition {
    switch (true) {
      case item.style?.floating === true:
      case item.type == GodzillaItemTypes.checkbox:
        return "bottom"
      case item.style?.floating === false:
        return "top"
      case item.type == GodzillaItemTypes.heading:
        return "none"
      default:
        return "top"
    }
  }

  /**
   * Public function to notify the parser component to reset the form
   */
  public notifyFormChanged(){
    this.createForm(this.jsonForm);

  }
  /**
   * Public function to be called by another component to validate the form and emit
   * the form values
   */
  public validate() {
    this._submitted = true;
    if (this.form.valid)
      this.validData.emit(this.form.getRawValue());
  }

  /**
   * Internal function to return the form control
   * @param item: GodzillaFormControls
   * Returns: AbstractControl | null
   * @private
   */
  _getFormController(item: GodzillaFormControls) {
    return this.form.get(item.id)!!
  }

  /**
   * Internal function to return the form control by id
   * @param id: form controller id
   * Returns: AbstractControl | null
   * @private
   */
  _getFormControllerById(id: string) {
    return this.form.get(id)
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
      return
    }
    let _controller = this._getFormController(item);
    _controller.setValue(event.target.checked);
  }

  /**
   * Internal function to build the dynamic form
   * @param controls: GodzillaFormControls[]
   * @private
   */
  private createForm(controls: GodzillaFormControls[]) {
    for (const control of controls) {
      if (control.type == GodzillaItemTypes.heading) continue
      const validatorsToAdd = controlValidators(control);
      if (control.value.valueSource == GodzillaValueSource.service) {
        this._getDataFromService(control, control.value.serviceName);
      }
      this.form.addControl(control.id, this._formBuilder.control(control.value.defaultValue, validatorsToAdd));
    }
  }


  /**
   * Internal function to update the default value of control based on injected service name
   * @param control: control to update the default value from service
   * @param serviceName: injected service name
   * @private
   */
  private _getDataFromService(control: GodzillaFormControls, serviceName?: string) {
    if (!serviceName)
      return
    control.value.valueOptions = [];
    this._godzillaLoader.getDataService(serviceName).then(data => {
      control.value.valueOptions = data;
    }).catch(err => {
      console.error(err);
    })
  }

  /**
   * Internal function to check if the form ç is based on another form control
   * If yes, then the validator will validate the flow and return the status
   * @param control
   * @private
   */
  _isFlowValid(control: GodzillaFormControls) {
    if (!control.flow || !control.flow.basedOn)
      return true
    return controlFlow(control, this._getFormControllerById(control.flow.basedOn))
  }


  /**
   * Internal function to return the desired css classes for any form control
   * @param control
   * @private
   */
  _getCssClass(control: GodzillaFormControls) {
    return controlCssClass(control, this.enableGridSystem)
  }


}

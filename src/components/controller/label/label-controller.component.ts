import { Component, Input } from '@angular/core';
import { GodzillaFormControls } from '@godzilla-forms/core';
import { ControlContainer } from '@angular/forms';

@Component({
	selector: 'godzilla-forms-label-controller',
	templateUrl: './label-controller.component.html',
})
export class LabelControllerComponent {
	// @ts-ignore
	@Input() control: GodzillaFormControls;

	constructor(public controlContainer: ControlContainer) {}
}

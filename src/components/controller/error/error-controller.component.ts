import { Component, Input, OnInit } from '@angular/core';
import { GodzillaFormControls } from '@godzilla-forms/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
	selector: 'godzilla-forms-error-controller',
	templateUrl: './error-controller.component.html',
})
export class ErrorControllerComponent implements OnInit {
	// @ts-ignore
	@Input public controlName: string;

	// @ts-ignore
	public form: FormGroup;

	// @ts-ignore
	@Input() control: GodzillaFormControls;

	@Input() submitted = false;

	constructor(public controlContainer: ControlContainer) {}

	ngOnInit() {
		this.form = <FormGroup>this.controlContainer.control;
	}

	get errorList() {
		const errors = this.form.get(this.controlName)?.errors;
		if (errors) {
			return errors;
		}
		return [];
	}
}

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
	GodzillaForm,
	GodzillaFormControls,
	GodzillaFormPage,
	GodzillaFormType,
	GodzillaItemTypes,
	GodzillaValueSource,
} from '@godzilla-forms/core';
import { GodzillaLoaderService } from '../utils/services/loader.service';
import { controlCssClass, controlFlow, controlValidators } from '../utils/controller';

@Component({
	selector: 'godzilla-forms-parser',
	templateUrl: './form-parser.component.html',
	styleUrls: [],
})
export class GodzillaFormsParserComponent implements OnChanges {
	@Input() form: GodzillaForm | undefined;

	@Input() jsonForm: string | undefined;

	@Input() enableGridSystem: boolean = true;

	@Output() readonly validData: EventEmitter<any> = new EventEmitter<any>();

	submitted = false;

	readonly formGroup: FormGroup = this.formBuilder.group({});

	constructor(private formBuilder: FormBuilder, private godzillaLoader: GodzillaLoaderService) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	ngOnChanges(changes: SimpleChanges) {
		if (this.form || this.jsonForm) {
			this.form = this.form || (JSON.parse(this.jsonForm || '') as GodzillaForm);
			this.createPages(this.form.pages);
		}
	}

	/**
	 * Public function to notify the parser component to reset the form
	 */
	public notifyFormChanged() {
		if (this.form) {
			this.createPages(this.form.pages);
		}
	}

	/**
	 * Public function to be called by another component to validate the form and emit
	 * the form values
	 */
	public validate() {
		this.submitted = true;
		if (this.formGroup.valid) {
			this.validData.emit(this.formGroup.getRawValue());
		}
	}

	/**
	 * Internal function to return the form control by id
	 * @param id: form controller id
	 * Returns: AbstractControl | null
	 * @private
	 */
	getFormControllerById(id: string) {
		return this.formGroup.get(id);
	}

	/**
	 * Internal function to build the dynamic form
	 * @param pages: GodzillaFormPage[]
	 * @private
	 */
	private createPages(pages: GodzillaFormPage[]) {
		// eslint-disable-next-line no-restricted-syntax
		for (const page of pages) {
			// eslint-disable-next-line no-continue
			if (this.form?.style.type === GodzillaFormType.classic) {
				this.createForm(page.controls, this.formGroup);
			} else {
				const group = this.formBuilder.group({});
				this.formGroup.addControl(page.id, group);
			}
		}
	}

	/**
	 * Internal function to build the dynamic form
	 * @param controls: GodzillaFormControls[]
	 * @param group: Form Group to add the controls to.
	 * @private
	 */
	private createForm(controls: GodzillaFormControls[], group: FormGroup): FormGroup {
		// eslint-disable-next-line no-restricted-syntax
		for (const control of controls) {
			// eslint-disable-next-line no-continue
			if (control.type === GodzillaItemTypes.heading) continue;
			const validatorsToAdd = controlValidators(control);
			if (control.value.valueSource === GodzillaValueSource.service) {
				this.getDataFromService(control, control.value.serviceName);
			}
			group.addControl(
				control.id,
				this.formBuilder.control(control.value.defaultValue, validatorsToAdd),
			);
		}
		return group;
	}

	/**
	 * Internal function to update the default value of control based on injected service name
	 * @param control: control to update the default value from service
	 * @param serviceName: injected service name
	 * @private
	 */
	private getDataFromService(control: GodzillaFormControls, serviceName?: string) {
		if (!serviceName) {
			return;
		}
		control.value.valueOptions = [];
		this.godzillaLoader
			.getDataService(serviceName)
			.then((data) => {
				control.value.valueOptions = data;
			})
			.catch(() => {});
	}

	/**
	 * Internal function to check if the form ç is based on another form control
	 * If yes, then the validator will validate the flow and return the status
	 * @param control
	 * @private
	 */
	isFlowValid(control: GodzillaFormControls) {
		if (!control.flow || !control.flow.basedOn) {
			return true;
		}
		return controlFlow(control, this.getFormControllerById(control.flow.basedOn));
	}

	/**
	 * Internal function to return the desired css classes for any form control
	 * @param control
	 * @private
	 */
	getCssClass(control: GodzillaFormControls) {
		return controlCssClass(control, this.enableGridSystem);
	}
}

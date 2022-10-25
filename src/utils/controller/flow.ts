import { GodzillaConditions, GodzillaFormControls } from '@godzilla-forms/core';

export function controlFlow(control: GodzillaFormControls, rootController: any) {
	if (!control.flow || !control.flow.basedOn || !rootController) {
		return true;
	}
	switch (control.flow.condition) {
		case GodzillaConditions.equal:
			return rootController.value === control.flow.value;
		case GodzillaConditions.notEqual:
			return rootController.value !== control.flow.value;
		case GodzillaConditions.isEmpty:
			return rootController.value.toString().trim().length === 0;
		case GodzillaConditions.isNotEmpty:
			return rootController.value.toString().trim().length !== 0;
		case GodzillaConditions.greaterThan:
			if (control.flow.value) {
				return rootController.value > control.flow.value;
			}
			return false;
		case GodzillaConditions.greaterThanOrEqual:
			if (control.flow.value) {
				return rootController.value >= control.flow.value;
			}
			return false;
		case GodzillaConditions.lessThan:
			if (control.flow.value) {
				return rootController.value < control.flow.value;
			}
			return false;
		case GodzillaConditions.lessThanOrEqual:
			if (control.flow.value) {
				return rootController.value <= control.flow.value;
			}
			return false;
		case GodzillaConditions.contains:
			if (control.flow.value) {
				return rootController.value.includes(control.flow.value);
			}
			return false;
		case GodzillaConditions.notContains:
			if (control.flow.value) {
				return !rootController.value.includes(control.flow.value);
			}
			return false;
		case GodzillaConditions.startsWith:
			if (control.flow.value) {
				return rootController.value.startsWith(control.flow.value);
			}
			return false;
		case GodzillaConditions.endsWith:
			if (control.flow.value) {
				return rootController.value.endsWith(control.flow.value);
			}
			return false;
		case GodzillaConditions.isTrue:
			return rootController.value === true;
		case GodzillaConditions.isFalse:
			return rootController.value === false;
		default:
			return true;
	}
}

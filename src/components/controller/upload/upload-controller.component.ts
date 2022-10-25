import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GodzillaFormControls } from '@godzilla-forms/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { requiredFileSize, requiredFileType } from '../../../utils/validator';

@Component({
	selector: 'godzilla-forms-upload-controller',
	templateUrl: './upload-controller.component.html',
})
export class UploadControllerComponent implements OnInit {
	// @ts-ignore
	@Input public controlName: string;

	// @ts-ignore
	public form: FormGroup;

	// @ts-ignore
	@Input() control: GodzillaFormControls;

	@Input() submitted = false;

	@Output() readonly fileAdded: EventEmitter<File | null> = new EventEmitter<File | null>();

	constructor(public controlContainer: ControlContainer) {}

	ngOnInit() {
		this.form = <FormGroup>this.controlContainer.control;
	}

	onFileAdded(event: Event) {
		const element = event.currentTarget as HTMLInputElement;
		const fileList: FileList | null = element.files;
		const file = fileList?.item(0);
		if (file) {
			this.fileAdded.emit(file);
			this.validate(file);
		}
	}

	validate(fileList: File) {
		if (this.control.validators?.maxSize) {
			const validation = requiredFileSize(fileList, this.control.validators?.maxSize);
			if (validation) {
				this.form.get(this.controlName)?.setErrors(validation);
			}
		}
		if (this.control.validators?.allowedTypes) {
			const validation = requiredFileType(fileList, this.control.validators?.allowedTypes);
			validation.pipe().subscribe((result) => {
				this.form.get(this.controlName)?.setErrors(result);
			});
		}
	}
}

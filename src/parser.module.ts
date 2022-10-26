import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GodzillaLoaderService } from './utils/services/loader.service';
import { GODZILLA_OPTIONS, GodzillaOptions } from './utils/factory';
import { GodzillaFormsParserComponent } from './components';
import {
	ErrorControllerComponent,
	HeadingControllerComponent,
	InputControllerComponent,
	LabelControllerComponent,
	RadioControllerComponent,
	SelectControllerComponent,
	TextareaControllerComponent,
	UploadControllerComponent,
} from './components/controller';
import { ButtonControllerComponent } from './components/controller/button/button-controller.component';
import {GodzillaFormService} from "./utils/services/http.service";

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [
		GodzillaFormsParserComponent,
		SelectControllerComponent,
		TextareaControllerComponent,
		InputControllerComponent,
		LabelControllerComponent,
		HeadingControllerComponent,
		ErrorControllerComponent,
		ButtonControllerComponent,
		RadioControllerComponent,
		UploadControllerComponent,
	],
	exports: [GodzillaFormsParserComponent],
	providers: [GodzillaLoaderService, GodzillaFormService],
})
export class GodzillaParserModule {
	public static forRoot(config?: GodzillaOptions): ModuleWithProviders<GodzillaParserModule> {
		return this.getConfig(config);
	}

	public static forChild(config?: GodzillaOptions): ModuleWithProviders<GodzillaParserModule> {
		return this.getConfig(config);
	}

	private static getConfig(config?: GodzillaOptions) {
		return {
			ngModule: GodzillaParserModule,
			providers: [
				{
					provide: GODZILLA_OPTIONS,
					useValue: config,
				},
			],
		};
	}
}

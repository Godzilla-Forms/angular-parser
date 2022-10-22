import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GodzillaLoaderService } from './utils/services/loader.service';
import { GODZILLA_OPTIONS, GodzillaOptions } from './utils/factory';
import { GodzillaFormsParserComponent } from './components';
import {
  ErrorControllerComponent,
  HeadingControllerComponent,
  InputControllerComponent, LabelControllerComponent, RadioControllerComponent,
  SelectControllerComponent,
  TextareaControllerComponent,
  UploadControllerComponent
} from './components/controller';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    GodzillaFormsParserComponent,
    SelectControllerComponent,
    TextareaControllerComponent,
    InputControllerComponent,
    LabelControllerComponent,
    HeadingControllerComponent,
    ErrorControllerComponent,
    RadioControllerComponent,
    UploadControllerComponent
  ],
  exports: [
    GodzillaFormsParserComponent
  ],
  providers: [GodzillaLoaderService]
})

export class GodzillaParserModule {
  public static forRoot(config?: GodzillaOptions): ModuleWithProviders<GodzillaParserModule> {
    return {
      ngModule: GodzillaParserModule,
      providers: [{
        provide: GODZILLA_OPTIONS,
        useValue: config
      }]
    };
  }

  public static forChild(): ModuleWithProviders<GodzillaParserModule> {
    return {
      ngModule: GodzillaParserModule,
      providers: []
    };
  }
}


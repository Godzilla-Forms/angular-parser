import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GodzillaFormsParserComponent } from './components/form-parser.component';
import { GodzillaLoaderService } from './utils/services/loader.service';
import { GODZILLA_OPTIONS, GodzillaOptions } from './utils/factory';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    GodzillaFormsParserComponent

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


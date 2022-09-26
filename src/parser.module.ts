import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GodzillaFormsParserComponent} from "./components/form-parser.component";
import {GodzillaLoaderService} from "./utils/services/loader.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    GodzillaFormsParserComponent,

  ],
  exports: [
    GodzillaFormsParserComponent,

  ],
  providers: [GodzillaLoaderService]
})
export class GodzillaParserModule {
}

import {InjectionToken, Type} from '@angular/core';
import {GodzillaService} from '@godzilla-forms/core';

export const GODZILLA_OPTIONS: InjectionToken<GodzillaOptions> =
  new InjectionToken<GodzillaOptions>('GODZILLA_OPTIONS');

export interface GodzillaStaticProvider {
  provide: Type<GodzillaService>;
  deps?: [];
}

export interface GodzillaOptions {
  dataServices?: Record<string, GodzillaStaticProvider>;
  accessKey?: string;
}

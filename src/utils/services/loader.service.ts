import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { GodzillaDataService, GodzillaFormCombinedValues } from '@godzilla-forms/core';
import { GODZILLA_OPTIONS, GodzillaOptions } from '../factory';

@Injectable({ providedIn: 'root' })
export class GodzillaLoaderService {
  private readonly options: GodzillaOptions = {};

  private readonly services: {
    service: string;
    provider: GodzillaDataService;
  }[] = [];

  constructor(
    @Optional() @Inject(GODZILLA_OPTIONS) injector: GodzillaOptions,
    private rootInjector: Injector,
  ) {
    if (injector) {
      this.options = injector;
      this.injectCustomProvider();
    }
  }

  private injectCustomProvider() {
    if (!this.options.dataServices) return;
    const dataService = this.options.dataServices;
    Object.keys(dataService).forEach((key) => {
      const staticProvider = dataService[key];
      const providerInjector = Injector.create({
        providers: [
          {
            provide: staticProvider.provide,
            deps: staticProvider.deps,
          },
        ],
        parent: this.rootInjector,
      });
      this.services.push({
        service: key,
        provider: providerInjector.get(staticProvider.provide) as GodzillaDataService,
      });
    });
  }

  getDataService(serviceName: string): Promise<GodzillaFormCombinedValues[]> {
    if (!this.options.dataServices) {
      return Promise.reject(new Error('Data services provider is not provided'));
    }
    const requestedProvider = this.services.find((item) => item.service === serviceName);
    if (requestedProvider === undefined) {
      return Promise.reject(new Error(`Service ${serviceName} is not provided`));
    }
    return requestedProvider.provider.getData();
  }
}

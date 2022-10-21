import {Inject, Injectable, Injector, Optional} from "@angular/core";
import {GodzillaDataService, GodzillaFormCombinedValues} from "@godzilla-forms/core";
import {GODZILLA_OPTIONS, GodzillaOptions} from "../factory";

@Injectable({providedIn: 'root'})
export class GodzillaLoaderService {

  private readonly _options: GodzillaOptions = {}
  private readonly services: { service: string, provider: GodzillaDataService }[] = []

  constructor(@Optional() @Inject(GODZILLA_OPTIONS) injector: GodzillaOptions,
              private rootInjector: Injector) {
    if (injector) {
      this._options = injector
      this.injectCustomProvider()
    }
  }

  private injectCustomProvider() {
    for (let optionsKey in this._options.dataServices) {
      const staticProvider = this._options.dataServices[optionsKey];
      const providerInjector = Injector.create({
        providers: [{provide: staticProvider.provide, deps: staticProvider.deps}],
        parent: this.rootInjector
      });
      this.services.push({
        service: optionsKey,
        provider: providerInjector.get(staticProvider.provide) as GodzillaDataService
      });

    }
  }

  getDataService(serviceName: string): Promise<GodzillaFormCombinedValues[]> {
    if (!this._options.dataServices)
      return Promise.reject("Data services provider is not provided")
    let requestedProvider = this.services.find(item => item.service == serviceName)
    if (requestedProvider === undefined)
      return Promise.reject(`Service ${serviceName} is not provided`)
    return requestedProvider.provider.getData()
  }
}

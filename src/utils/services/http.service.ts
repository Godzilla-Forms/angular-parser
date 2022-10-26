import {Injectable} from '@angular/core';
import {GodzillaForm} from '@godzilla-forms/core';
import {HttpBackend, HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({providedIn: 'root'})
export class GodzillaFormService {
  private httpClient: HttpClient;

  constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }


  fetchForm(formId: string) {
    return this.httpClient.get<any>(`https://api.godzilla-forms.io/form/${formId}`)
      .pipe(map((form) => JSON.parse(form.content) as GodzillaForm
      ));
  }
}

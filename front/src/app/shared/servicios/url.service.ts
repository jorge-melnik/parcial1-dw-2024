import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private _backUrl = '/back/';

  get backUrl() {
    return this._backUrl;
  }
}

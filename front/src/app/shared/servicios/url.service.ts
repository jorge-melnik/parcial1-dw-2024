import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private _backUrl = '';
  constructor() {
    let base = window.location.origin;
    if (environment.hostUrl) {
      base = environment.hostUrl;
    }
    this._backUrl = base + '/back/';
  }

  get backUrl() {
    return this._backUrl;
  }
}

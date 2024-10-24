import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private _backUrl = '';
  constructor() {
    this._backUrl = window.location.origin + '/back/';
  }

  get backUrl() {
    return this._backUrl;
  }
}

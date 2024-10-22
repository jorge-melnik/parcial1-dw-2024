import {
  ApplicationConfig,
  forwardRef,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS } from '@angular/forms';
import { DivisorDirective } from './directivas/divisor.directive';
import { TakenDirective } from './directivas/taken.directive';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: NG_VALIDATORS,
      useExisting: DivisorDirective,
      multi: true,
    },
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => TakenDirective),
      multi: true,
    },
  ],
};

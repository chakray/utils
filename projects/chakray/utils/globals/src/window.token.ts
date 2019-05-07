import { Inject, InjectionToken, Injectable } from '@angular/core';

function windowFactory() {
  return window;
}

export const windowToken = new InjectionToken<Window>('globals.window', {
  providedIn: 'root', factory: windowFactory
});

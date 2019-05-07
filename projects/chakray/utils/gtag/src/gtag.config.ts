import { Inject, Injectable, InjectionToken } from '@angular/core';

export function emptyTrackId() {
  return '__gtag.id__';
}
export const gtagID = new InjectionToken<string>('gtag.id', {
  providedIn: 'root', factory: emptyTrackId
});

export function gtagMgrUrl() {
  return 'https://www.googletagmanager.com/gtag/js?id=';
}
export const gtagLib = new InjectionToken<string>('gtag.lib', {
  providedIn: 'root', factory: gtagMgrUrl
});


@Injectable({ providedIn: 'root' })
export class GtagConfig {
  constructor(@Inject(gtagLib) private libHost: string = '',
              @Inject(gtagID) private id: string = '') { }
  get trackId() {
    return this.id;
  }
  get libUrl() {
    return `${this.libHost}${this.id}`;
  }
}

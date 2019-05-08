import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { windowToken } from './window.token';

@Injectable({ providedIn: 'root' })
export class Globals {
  window: Window;
  document: Document;
  constructor(@Inject(DOCUMENT) private doc: Document,
              @Inject(windowToken) private wnd: any) {
    this.document = doc;
    this.window = wnd;
  }
}

import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { HeadMod } from './head.mod';

@Injectable({ providedIn: HeadMod })
export class Head {
  private used = {};
  constructor(@Inject(DOCUMENT) private doc) { }
  style(href) {
    if (this.used[href]) { return; }
    this.used[href] = true;
    this.link({
      rel: 'stylesheet',
      type: 'text/css',
      href: href });
  }
  canonical(url?) {
    this.link({ rel: 'canonical', href: url || this.doc.URL });
  }
  link(attrs) {
    const link: HTMLLinkElement = this.doc.createElement('link');
    Object.keys(attrs).forEach(k => {
      link.setAttribute(k, attrs[k]);
    });
    this.doc.head.appendChild(link);
  }
}

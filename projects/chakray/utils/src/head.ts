import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
      href });
  }
  canonical(url?) {
    this.link({ rel: 'canonical', href: url || this.doc.URL });
  }
  link(attrs) {
    this.tag('link', attrs);
  }
  script(attrs) {
    this.tag('script', attrs);
  }
  tag(name, attrs) {
    const el: HTMLLinkElement = this.doc.createElement(name);
    Object.keys(attrs).forEach(k => {
      el.setAttribute(k, attrs[k]);
    });
    this.doc.head.appendChild(el);
  }
}

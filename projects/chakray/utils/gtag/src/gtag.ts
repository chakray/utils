import { Injectable } from '@angular/core';
import { GtagConfig } from './gtag.config';
import { Globals } from '@chakray/utils/globals';

export interface GtagWindow extends Window {
  dataLayer: any[];
}

export interface Params {
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class Gtag {
  get wnd(): GtagWindow {
    return this.g.window || {} as any;
  }
  get doc() {
    return this.g.document || {};
  }
  constructor(private cfg: GtagConfig, private g: Globals) {
    this.init();
  }
  event(name, params?: Params) {
    this.cmd('event', name, params);
  }
  set(params: Params) {
    this.cmd('set', params);
  }
  config(params: Params) {
    this.cmd('config', this.cfg.trackId, params);
  }
  cmd(...data) {
    this.dataLayer.push(arguments);
  }
  private get dataLayer() {
    return this.wnd.dataLayer;
  }
  private init() {
    this.injectScriptTag();
    const { dataLayer = [] } = this.wnd;
    this.wnd.dataLayer = dataLayer;
    this.cmd('js', new Date());
    this.cmd('config', this.cfg.trackId);
  }
  private injectScriptTag() {
    const doc = this.doc;
    const url = this.cfg.libUrl;
    return new Promise((resolve, reject) => {
      const head = doc.head || doc.getElementsByTagName('head')[0];
      const script = doc.createElement('script');
      script.async = true;
      script.src = url;
      script.charset = 'utf8';
      head.appendChild(script);
      script.onload = resolve;
      script.onerror = reject;
    });
  }
}

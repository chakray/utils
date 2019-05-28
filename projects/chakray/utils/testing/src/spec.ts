import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, fakeAsync, TestModuleMetadata } from '@angular/core/testing';
import { Ref } from './ref';

type Meta = TestModuleMetadata & {
  override?: TestModuleMetadata
};

export class Spec {
  static t(T, fn) {
    return Spec.tag(T, { schemas: [NO_ERRORS_SCHEMA] }, fn);
  }
  static tag(T, opts: Meta = {}, fn = (a) => {}) {
    const ref = new Ref();
    const { override, ...rst } = opts;
    describe(T.name, () => {
      beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
          ...rst,
          declarations: [T],
        }).compileComponents();
        if (override) {
          TestBed.overrideComponent(T, { set: override });
        }
        ref.fixture = TestBed.createComponent(T);
        ref.tag = ref.fixture.debugElement.componentInstance;
      }));
      it('is creatable', () => {
        expect(ref.tag).toBeTruthy();
      });
      fn(ref);
    });
  }
  static pdr(Pdr, opts: any = {}, fn = (a) => {}) {
    const ref = new Ref();
    describe(Pdr.name, () => {
      beforeEach(fakeAsync(() => {
        const { providers = [], ...rest } = opts;
        TestBed.configureTestingModule({
          ...rest,
          providers: [Pdr, ...providers],
        }).compileComponents();
        ref.pdr = TestBed.get(Pdr);
      }));
      it('is injectable', () => {
        expect(ref.pdr).toBeTruthy();
      });
      fn(ref);
    });
  }
}

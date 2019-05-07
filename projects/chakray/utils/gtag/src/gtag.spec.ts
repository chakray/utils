import { inject } from '@angular/core/testing';
import { Spec } from '@chakray/utils/testing';

import { windowToken } from '@chakray/utils/globals';
import { Gtag as Pdr } from './gtag';

function mockDoc() {
  return {
    createElement() { return {}; },
    head: {
      appendChild() { }
    }
  };
}

class MockDate { }

function mockWindow() {
  const document = mockDoc();
  return { document, Date: MockDate };
}

Spec.pdr(Pdr, {
  providers: [
    { provide: windowToken, useFactory: mockWindow }
  ]
}, (ref) => {
  let p: Pdr;
  beforeEach(() => {
    p = ref.pdr;
  });
  it('should have command for "js" first', inject([windowToken], (wnd) => {
    expect(wnd.dataLayer[0][0]).toEqual('js');
  }));
  it('should have command for "config" second', inject([windowToken], (wnd) => {
    expect(wnd.dataLayer[1][0]).toEqual('config');
  }));
  const expectLastArguments = (data) => {
    const desc = `last arguments equals ${JSON.stringify(data)}`;
    it(desc, inject([windowToken], (wnd) => {
      const args = Array.from(wnd.dataLayer.pop());
      expect(args).toEqual(data);
    }));
  };
  describe('.event(name, params)', () => {
    describe('with params not given', () => {
      beforeEach(() => {
        p.event('test-event');
      });
      expectLastArguments(['event', 'test-event', undefined]);
    });
    describe('with params given', () => {
      beforeEach(() => {
        p.event('test-event', { a: 1 });
      });
      expectLastArguments(['event', 'test-event', { a: 1 }]);
    });
  });
  describe('.set(params)', () => {
    beforeEach(() => {
      p.set({ key: 'value' });
    });
    expectLastArguments(['set', { key: 'value' }]);
  });
  describe('.config(params)', () => {
    beforeEach(() => {
      p.config({ key: 'value' });
    });
    expectLastArguments(['config', '__gtag.id__', { key: 'value' }]);
  });
});

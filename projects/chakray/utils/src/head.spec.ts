import { Spec } from '../testing/src/spec';

import { DOCUMENT } from '@angular/platform-browser';
import { Head as P } from './head';

const mockDoc = {
    test: null,
    createElement(n) {
        return {
            setAttribute(q) { }
        };
    },
    head: {
        appendChild(e) {
            mockDoc.test = 'touched';
        }
    }
};

Spec.pdr(P, {
    providers: [{ provide: DOCUMENT, useValue: mockDoc }]
}, (ref) => {
    let p: P;
    beforeEach(() => {
        p = ref.pdr;
    });
    ref.fn('link', () => {
        it('should pass', () => {
            p.link({ a: 1 });
            expect(mockDoc.test).toEqual('touched');
        });
    });
    ref.fn('style', () => {
        it('when called once', () => {
            p.style('test');
            expect(mockDoc.test).toEqual('touched');
        });
        it('when called twice with the same params', () => {
            p.style('test');
            p.style('test');
            expect(mockDoc.test).toEqual('touched');
        });
    });
    ref.fn('canonical', () => {
        it('with no params', () => {
            p.canonical();
            expect(mockDoc.test).toEqual('touched');
        });
        it('with params', () => {
            p.canonical('ok');
            expect(mockDoc.test).toEqual('touched');
        });
    });
    ref.fn('script', () => {
        it('with empty params', () => {
            p.script({});
            expect(mockDoc.test).toEqual('touched');
        });
    });
});

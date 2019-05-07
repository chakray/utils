export class Ref {
  tag: any;
  fixture: any;
  // [key: string]: any;
  hasSame(key, obj) {
    expect(this.tag[key]).toEqual(obj[key]);
  }
  fn(k, fn) {
    describe(`.${k}`, () => {
      fn(() => this.tag[k].bind(this.tag));
    });
  }
  prop(k, fn) {
    describe(`.${k}`, () => {
      fn(() => this.tag[k]);
    });
  }
  equal(v, cmp) {
    expect(v()).toEqual(cmp);
  }
}

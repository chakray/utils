import { Globals } from './globals';

describe(Globals.name, () => {
  let mockWnd = {};
  let mockDoc = {};
  let g: Globals;
  const newGlobals = (doc, wnd) => {
    g = new Globals(doc, wnd);
  };

  beforeEach(() => {
    newGlobals(mockDoc, mockWnd);
  });

  it('.window to equal mockWnd', () => {
    expect(g.window).toEqual(mockWnd);
  });
  it('.document to equal mockDoc', () => {
    expect(g.document).toEqual(mockDoc);
  });
});

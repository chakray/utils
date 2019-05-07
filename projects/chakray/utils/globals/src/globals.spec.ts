import { Globals } from './globals';

describe(Globals.name, () => {
  let mockWindow;
  let g: Globals;
  const newGlobals = (wnd) => {
    g = new Globals(wnd);
  };

  beforeEach(() => {
    mockWindow = {};
    newGlobals(mockWindow);
  });

  it('.window equals to mockWindow', () => {
    expect(g.window).toEqual(mockWindow);
  });
  describe('when mockWindow.window defined', () => {
    beforeEach(() => {
      mockWindow.window = { another: 'window' };
      newGlobals(mockWindow);
    });
    it('.window equals to mockWindow', () => {
      expect(g.window).toEqual(mockWindow.window);
    });
  });
  describe('when mockWindow.document defined', () => {
    beforeEach(() => {
      mockWindow.document = { document: 'interface' };
      newGlobals(mockWindow);
    });
    it('.window equals to mockWindow', () => {
      expect(g.document).toEqual(mockWindow.document);
    });
  });
  describe('when mockWindow.localstorage defined', () => {
    beforeEach(() => {
      mockWindow.localStorage = { localStorage: 'interface' };
      newGlobals(mockWindow);
    });
    it('.window equals to mockWindow', () => {
      expect(g.localStorage).toEqual(mockWindow.localStorage);
    });
  });
});

# setup

__cli__

```
  npm i @chakray/utils --save
```

## spa

__angular.json__
```
  "scripts": [
+    "node_modules/@chakray/utils/gh-spa/redirect.ts"
  ],
  "assets": [
    "src/favicon.ico",
    "src/assets",
+   {
+     "glob": "404.html",
+     "input": "node_modules/@chakray/utils/src/gh-spa",
+     "output": "./"
+   }
  ]
```

## testing

```typescript
import { Spec, Ref } from '@chakray/utils/testing';
import { ChHeroTag as Tag } from './hero.tag';

Spec.outline(Tag, (ref: Ref) => {
  let tag: Tag;
  beforeEach(() => {
    tag = ref.tag;
  });
  ref.prop('data', () => {
    it('should update properties', () => {
      tag.data = { mod: 'test-tag' };
      expect(tag.badges[0].url.endsWith('test-tag')).toBeTruthy();
    });
  });
});
```

## gtag


```
import { gtagID } from '@chakray/utils/gtag';

  providers: [
+    { provide: gtagID, useValue: env.gtagId }
  ],
```

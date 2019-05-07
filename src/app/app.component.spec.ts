import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { Spec } from '@chakray/utils/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
const mockHttp = {
  get() { return of('# test\ncontent\na'); }
};

import { AppComponent as Tag } from './app.component';

Spec.tag(Tag, {
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    RouterTestingModule,
    HttpClientTestingModule
  ],
  providers: [
    { provide: HttpClient, useValue: mockHttp }
  ]
}, (ref) => {
  let t: Tag;
  beforeEach(() => {
    t = ref.tag;
  });

  it('should handle http.get', () => {
    expect(t.data.setup).toEqual({ title: 'test', content: 'content\na' });
  });
});

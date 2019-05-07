import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const mockHttp = {
  get() { return of('# test\ncontent\na'); }
};

import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent as Tag } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: HttpClient, useValue: mockHttp }
      ],
      declarations: [
        Tag
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(Tag);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should handle http.get', () => {
    const fixture = TestBed.createComponent(Tag);
    const app = fixture.debugElement.componentInstance;
    expect(app.data.setup).toEqual({ title: 'test', content: 'content\na' });
  });
});

import { TestBed } from '@angular/core/testing';

import { AppModule } from './app.module';

describe('AppModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
  });

  it('should init module', () =>
    expect(TestBed.inject(AppModule)).toBeTruthy());
});

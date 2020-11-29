import { TestBed } from '@angular/core/testing';

import { AppModule } from './../../app.module';
import { PhotosModule } from './photos.module';

import { PicsumService } from './services/picsum/picsum.service';

describe('PhotosModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, PhotosModule],
    });
  });

  it('should init module', () => {
    expect(TestBed.inject(PhotosModule)).toBeTruthy();

    expect(TestBed.inject(PicsumService)).toBeTruthy();
  });
});

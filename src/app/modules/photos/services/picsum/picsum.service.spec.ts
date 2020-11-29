import { TestBed, getTestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PicsumService } from './picsum.service';

import { PicsumPhoto } from '../../models/picsum-photo.model';
import { Photo } from './../../models/photo.model';

describe('PicsumService', () => {
  let injector: TestBed;
  let service: PicsumService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PicsumService],
    });

    injector = getTestBed();
    service = injector.inject(PicsumService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  const mockPage = 1;
  const mockLimit = 100;
  const mockData: PicsumPhoto[] = getPicsumPhotos();
  const expectedPhoto: Photo = getPhoto();

  it('should create', () => expect(service).toBeTruthy());

  describe('getAll()', () => {
    const baseMockReqUrl = 'https://picsum.photos/v2/list';

    it('should use correct params', () => {
      service.getAll().subscribe();

      const mockReqUrl = `${baseMockReqUrl}?page=${mockPage}&limit=${mockLimit}`;
      const mockReq = httpMock.expectOne(mockReqUrl);

      expect(mockReq.request.method).toBe('GET');
      expect(mockReq.request.url).toBe(baseMockReqUrl);
    });

    it('should return formatted data', async(() => {
      const totalLength = mockData.length * 40;

      service.getAll().subscribe((photos: Photo[]) => {
        expect(photos.length).toEqual(totalLength);
        expect(photos[0]).toEqual(expectedPhoto);
      });

      const mockReqUrl = `${baseMockReqUrl}?page=${mockPage}&limit=${mockLimit}`;
      const mockReq = httpMock.expectOne(mockReqUrl);

      mockReq.flush(mockData);
    }));
  });

  describe('getDetail()', () => {
    const baseMockReqUrl = `https://picsum.photos/id/${mockData[0].id}/info`;

    it('should use correct params', () => {
      service.getDetail(mockData[0].id).subscribe();

      const mockReq = httpMock.expectOne(baseMockReqUrl);

      expect(mockReq.request.method).toBe('GET');
      expect(mockReq.request.url).toBe(baseMockReqUrl);
    });

    it('should return formatted data', async(() => {
      service
        .getDetail(mockData[0].id)
        .subscribe((photo: Photo) => expect(photo).toEqual(expectedPhoto));

      const mockReq = httpMock.expectOne(baseMockReqUrl);

      mockReq.flush(mockData[0]);
    }));
  });
});

function getPicsumPhotos(): PicsumPhoto[] {
  return [
    {
      id: '0',
      author: 'Alejandro Escamilla',
      width: 5616,
      height: 3744,
      url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
      download_url: 'https://picsum.photos/id/0/5616/3744',
    },
    {
      id: '1',
      author: 'Alejandro Escamilla',
      width: 5616,
      height: 3744,
      url: 'https://unsplash.com/photos/LNRyGwIJr5c',
      download_url: 'https://picsum.photos/id/1/5616/3744',
    },
  ];
}

function getPhoto(): Photo {
  return {
    id: getPicsumPhotos()[0].id,
    photo: `https://picsum.photos/id/${getPicsumPhotos()[0].id}/500/500`,
    text: getPicsumPhotos()[0].author,
  };
}

export const MockPicsumService = (): unknown => ({
  getAll: () => of(getPicsumPhotos()),
  getDetail: () => of(getPhoto()),
});

import { of } from 'rxjs';

import { Photo } from '../models/photo.model';

export const mockPhotos: Photo[] = [
  {
    id: '1',
    photo: 'url_1',
    text: 'text_1',
  },
  {
    id: '2',
    photo: 'url_2',
    text: 'text_2',
  },
];

export const MockPicsumService = (): unknown => ({
  getAll: () => of(mockPhotos),
  getDetail: () => of(mockPhotos[0]),
});

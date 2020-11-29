import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { Photo } from '../../models/photo.model';
import { PicsumPhoto } from '../../models/picsum-photo.model';

const DEFAULT_PAGINATION = { page: '1', limit: '100' };
const BASE_URL = 'https://picsum.photos';

@Injectable()
export class PicsumService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Photo[]> {
    const endPoint = `${BASE_URL}/v2/list`;

    return this.http
      .get<PicsumPhoto[]>(endPoint, { params: DEFAULT_PAGINATION })
      .pipe(map(formattedPhotos), map(incrementPhotos), delay(3000));
  }

  getDetail(id: string): Observable<Photo> {
    const endpoint = `${BASE_URL}/id/${id}/info`;

    return this.http
      .get<PicsumPhoto>(endpoint)
      .pipe(map(formattedPhoto), delay(500));
  }
}

function formattedPhotos(photos: PicsumPhoto[]): Photo[] {
  return photos?.map((photo: PicsumPhoto) => formattedPhoto(photo));
}

function incrementPhotos(photos: Photo[]): Photo[] {
  let result = [];

  for (let index = 0; index < 40; index++) {
    result = [...result, ...photos];
  }

  return result;
}

function formattedPhoto(photo: PicsumPhoto): Photo {
  return {
    id: photo.id,
    photo: `${BASE_URL}/id/${photo.id}/500/500`,
    text: photo.author,
  };
}

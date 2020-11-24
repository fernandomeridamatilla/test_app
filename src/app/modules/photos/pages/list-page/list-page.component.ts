import { Component, OnInit } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { PicsumService } from '../../services/picsum/picsum.service';

import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
})
export class ListPageComponent implements OnInit {
  photos: Photo[];
  filteredPhotos: Photo[];
  isLoading: boolean;

  readonly notFoundMessage = 'No se han encontrado imágenes que mostrar';

  constructor(private picsumService: PicsumService) {}

  get notFoundMessageIsVisible(): boolean {
    return !this.isLoading && !this.filteredPhotos?.length;
  }

  get listIsVisible(): boolean {
    return !this.isLoading && !!this.filteredPhotos?.length;
  }

  ngOnInit(): void {
    this.getPhotos();
  }

  onInputChange(event: CustomEvent): void {
    const searchValue = event?.detail?.value;

    if (searchValue) {
      this.filterPhotos(searchValue);
    } else {
      this.filteredPhotos = this.photos;
    }
  }

  private getPhotos(): void {
    this.isLoading = true;

    this.picsumService
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (photos: Photo[]) => (this.photos = this.filteredPhotos = photos)
      );
  }

  private filterPhotos(filter: string): void {
    this.filteredPhotos = this.photos?.filter(
      (photo: Photo) =>
        photo.id === filter ||
        photo.text.toUpperCase().includes(filter.toUpperCase())
    );
  }
}

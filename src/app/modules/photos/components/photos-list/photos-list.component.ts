import { Component, Input } from '@angular/core';

import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
})
export class PhotosListComponent {
  @Input() photos: Photo[];
}

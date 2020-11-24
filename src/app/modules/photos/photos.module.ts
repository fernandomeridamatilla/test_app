import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { PhotosRoutingModule } from './photos-routing.module';

import { ListPageComponent } from './pages/list-page/list-page.component';

import { PhotosListComponent } from './components/photos-list/photos-list.component';

import { PicsumService } from './services/picsum/picsum.service';

@NgModule({
  declarations: [ListPageComponent, PhotosListComponent],
  providers: [PicsumService],
  imports: [CommonModule, IonicModule, PhotosRoutingModule, HttpClientModule],
})
export class PhotosModule {}

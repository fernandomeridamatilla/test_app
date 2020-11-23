import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

// Routing
import { PhotosRoutingModule } from './photos-routing.module';

// Pages
import { ListPageComponent } from './pages/list-page/list-page.component';

// Components
import { PhotosListComponent } from './components/photos-list/photos-list.component';

// Services
import { PicsumService } from './services/picsum/picsum.service';

@NgModule({
  declarations: [
    // Pages
    ListPageComponent,

    // Components
    PhotosListComponent,
  ],
  providers: [
    // Services
    PicsumService,
  ],
  imports: [CommonModule, IonicModule, PhotosRoutingModule, HttpClientModule],
})
export class PhotosModule {}

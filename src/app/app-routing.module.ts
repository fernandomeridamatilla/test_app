import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'photos',
    loadChildren: () =>
      import('./modules/photos/photos.module').then((m) => m.PhotosModule),
  },
  {
    path: '',
    redirectTo: 'photos',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'photos' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

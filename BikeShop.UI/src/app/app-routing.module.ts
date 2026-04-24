import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './ui/layout/layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'my-favourites',
        loadChildren: () =>
          import('./pages/my-favourites/my-favourites.module').then((m) => m.MyFavouritesModule),
      },
      {
        path: 'bike-details/:reference',
        loadChildren: () =>
          import('./pages/bike-details/bike-details.module').then(m => m.BikeDetailsModule)
      },
      {
        path: 'create-bike',
        loadChildren: () =>
          import('./pages/create-bike/create-bike.module').then(m => m.CreateBikeModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

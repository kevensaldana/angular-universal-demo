import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicFeatureComponent } from './public-feature.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicFeatureComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/home/home-view.module').then(m => m.HomeViewModule)
      },
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [PublicFeatureComponent],
  exports: [PublicFeatureComponent]
})
export class PublicFeatureModule {}

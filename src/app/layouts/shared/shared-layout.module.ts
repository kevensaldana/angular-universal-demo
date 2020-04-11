import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedLayoutComponent} from './shared-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: SharedLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../features/public/public-feature.module').then(m => m.PublicFeatureModule)
      },
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [SharedLayoutComponent],
  exports: [SharedLayoutComponent]
})
export class SharedLayoutModule {}

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedLayoutComponent} from './shared-layout.component';
import {FooterComponent} from '@ui/shared/ui/footer/footer.component';
import {HeaderComponent} from '@ui/shared/ui/header/header.component';

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
  declarations: [SharedLayoutComponent, HeaderComponent, FooterComponent],
  exports: [SharedLayoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedLayoutModule {}

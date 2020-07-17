import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedLayoutComponent} from './shared-layout.component';
import {HeaderComponent} from '@shared/presentation/containers/header/header.component';
import { FooterComponent } from '@shared/presentation/containers/footer/footer.component';

export const routes: Routes = [
  {
    path: '',
    component: SharedLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../features/public/presentation/public-feature.module').then(m => m.PublicFeatureModule)
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

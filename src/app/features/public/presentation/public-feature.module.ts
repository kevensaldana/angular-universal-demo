import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicFeatureComponent } from './public-feature.component';
import {NgxsModule} from '@ngxs/store';
import {CharacterStore} from '@features/public/presentation/state/character-store';
import { CharactersFacade } from '../application/characters-facade';
import {CharacterRepository} from '@features/public/infrastructure/repositories/character-repository';
import { ApiCharacters } from '../infrastructure/datasources/api-characters';

export const routes: Routes = [
  {
    path: '',
    component: PublicFeatureComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home-view.module').then(m => m.HomeViewModule)
      },
    ]
  }
];

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([CharacterStore]), RouterModule.forChild(routes)],
  declarations: [PublicFeatureComponent],
  providers: [
    CharactersFacade,
    CharacterRepository,
    ApiCharacters
  ],
  exports: [PublicFeatureComponent]
})
export class PublicFeatureModule {}

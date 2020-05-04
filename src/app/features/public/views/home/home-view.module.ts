import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeViewComponent} from './home-view.component';
import {RouterModule, Routes} from '@angular/router';
import { ImageLazyLoadModule } from '@shared/ui/image-lazy-load/image-lazy-load.module';
import {CharacterListComponent} from '@features/public/views/home/containers/character-list/character-list.component';
import {CharacterItemComponent} from '@features/public/views/home/ui/character-item/character-item.component';

const routes: Routes = [
  {
    path: '',
    component: HomeViewComponent
  }
];

@NgModule({
  imports: [CommonModule, ImageLazyLoadModule, RouterModule.forChild(routes)],
  declarations: [HomeViewComponent, CharacterListComponent, CharacterItemComponent]
})
export class HomeViewModule {}

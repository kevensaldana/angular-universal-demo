import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeViewComponent} from './home-view.component';
import {RouterModule, Routes} from '@angular/router';
import {ImageLazyLoadModule} from '@shared/presentation/ui/image-lazy-load/image-lazy-load.module';
import { CharacterListComponent } from './containers/character-list/character-list.component';
import { CharacterItemComponent } from './ui/character-item/character-item.component';

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

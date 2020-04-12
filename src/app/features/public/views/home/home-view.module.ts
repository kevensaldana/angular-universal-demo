import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeViewComponent} from './home-view.component';
import {RouterModule, Routes} from '@angular/router';
import {CharacterListComponent} from './infrastructure/containers/character-list/character-list.component';
import {CharacterItemComponent} from './infrastructure/ui/character-item/character-item.component';

const routes: Routes = [
  {
    path: '',
    component: HomeViewComponent
  }
];

@NgModule({
  imports: [CommonModule,  RouterModule.forChild(routes)],
  declarations: [HomeViewComponent, CharacterListComponent, CharacterItemComponent]
})
export class HomeViewModule {}

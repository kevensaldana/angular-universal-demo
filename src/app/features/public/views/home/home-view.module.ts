import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeViewComponent} from './home-view.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeViewComponent
  }
];

@NgModule({
  imports: [CommonModule,  RouterModule.forChild(routes)],
  declarations: [HomeViewComponent]
})
export class HomeViewModule {}

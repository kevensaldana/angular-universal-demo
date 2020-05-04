import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ErrorLayoutComponent} from '@ui/layout-error/error-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ErrorLayoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ErrorLayoutComponent],
  exports: [ErrorLayoutComponent]
})
export class ErrorLayoutModule {}

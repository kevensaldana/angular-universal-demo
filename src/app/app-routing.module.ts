import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'error',
    loadChildren: () => import('./layouts/layout-error/error-layout.module').then(m => m.ErrorLayoutModule)
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./layouts/shared/shared-layout.module').then(m => m.SharedLayoutModule)
  },
  {
    path: '**',
    redirectTo: '/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

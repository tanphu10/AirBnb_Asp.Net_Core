import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LocalComponent} from './locals/local.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'locals',
    pathMatch:'full'
  },
  {
    path: 'local',
    component: LocalComponent,
    data: {
      title: 'User',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule {
}

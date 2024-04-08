import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LocalComponent} from './locals/local.component';
import { AuthGuard } from 'src/app/shared/auth.guard';

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
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule {
}

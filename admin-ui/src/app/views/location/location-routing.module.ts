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
    path: 'locals',
    component: LocalComponent,
    data: {
      title: 'Location-room',
      requiredPolicy:'Permissions.Rooms.View'
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

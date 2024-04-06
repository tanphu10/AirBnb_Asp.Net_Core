import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './rooms/room.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rooms',
    pathMatch:'full'
  },
  {
    path: 'rooms',
    component: RoomComponent,
    data: {
      title: 'Rooms',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}

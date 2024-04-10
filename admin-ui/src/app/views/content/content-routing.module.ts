import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './rooms/room.component';
import { AuthGuard } from './../../shared/auth.guard';
import { SeriesComponent } from './series/series.component';
import {RoomCategoryComponent} from './room-categories/room-category.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'rooms',
    pathMatch: 'full',
  },
  {
    path: 'rooms',
    component: RoomComponent,
    data: {
      title: 'Rooms',
      requiredPolicy:'Permissions.Rooms.View'

    },
    canActivate: [AuthGuard],
  },
  {
    path: 'series',
    component: SeriesComponent,
    data: {
      title: 'series',
      requiredPolicy:'Permissions.Series.View'

    },
    canActivate: [AuthGuard],
  },
  {
    path: 'room-categories',
    component: RoomCategoryComponent,
    data: {
      title: 'room-categories',
      requiredPolicy:'Permissions.RoomCategories.View'
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}

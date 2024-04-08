import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookRoomComponent } from './book-rooms/bookroom.component';
import { AuthGuard } from 'src/app/shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rooms',
    pathMatch:'full'
  },
  {
    path: 'book-rooms',
    component: BookRoomComponent,
    data: {
      title: 'book-rooms',
    },
    canActivate:[AuthGuard]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}

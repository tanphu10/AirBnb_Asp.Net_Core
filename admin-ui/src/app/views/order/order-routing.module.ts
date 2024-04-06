import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookRoomComponent } from './book-rooms/bookroom.component';

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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}

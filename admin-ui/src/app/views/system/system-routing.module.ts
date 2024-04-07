import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from './users/user.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch:'full'
  },
  {
    path: 'users',
    component: UserComponent,
    data: {
      title: 'User',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}

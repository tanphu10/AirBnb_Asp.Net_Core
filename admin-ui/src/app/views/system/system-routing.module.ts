import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './users/user.component';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { RoleComponent } from './roles/role.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UserComponent,
    data: {
      title: 'User',
      requiredPolicy:'Permissions.Users.View'
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'roles',
    component: RoleComponent,
    data: {
      title: 'roles',
      requiredPolicy:'Permissions.Role.View'
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule {}

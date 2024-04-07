import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/auth/page404/page404.component';
import { Page500Component } from './views/auth/page500/page500.component';
import { LoginComponent } from './views/auth/login/login.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'system',
        loadChildren: () =>
          import('./views/system/system.module').then((m) => m.SystemModule),
      },
      {
        path: 'location',
        loadChildren: () =>
          import('./views/location/location.module').then(
            (m) => m.LocationModule
          ),
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule),
      },
      {
        path: 'content',
        loadChildren: () =>
          import('./views/content/content.module').then((m) => m.ContentModule),
      },
      {
        path: 'bookroom',
        loadChildren: () =>
          import('./views/order/order.module').then((m) => m.OrderModule),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

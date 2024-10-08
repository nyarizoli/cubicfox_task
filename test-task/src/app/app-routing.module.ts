import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared-components/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(s => s.SettingsModule)
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () => import('./users/users.module').then(u => u.UsersModule)
      },
      {
        path: 'absences',
        canActivate: [AuthGuard],
        loadChildren: () => import('./absences/absences.module').then(a => a.AbsencesModule)
      },
      {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

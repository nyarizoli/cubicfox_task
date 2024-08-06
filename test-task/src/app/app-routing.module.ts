import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(s => s.SettingsModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(u => u.UsersModule)
  },
  {
    path: 'absences',
    loadChildren: () => import('./absences/absences.module').then(a => a.AbsencesModule)
  },
  {
    path: '',
    redirectTo: 'settings',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

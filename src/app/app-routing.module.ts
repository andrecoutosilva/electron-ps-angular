import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { PackageCleanerComponent } from './package-cleaner/package-cleaner.component';
import { VersionCheckerComponent } from './version-checker/version-checker.component';

const routes: Routes = [
  { path: '', redirectTo: '/package-cleaner', pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent } ,
  { path: 'package-cleaner', component: PackageCleanerComponent  },
  { path: 'version-checker', component: VersionCheckerComponent  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

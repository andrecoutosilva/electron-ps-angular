import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatSidenavModule, 
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatInputModule,
  MatGridListModule,
  MatCardModule,
  MatCheckboxModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './/app-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { PackageCleanerComponent } from './package-cleaner/package-cleaner.component';
import { VersionCheckerComponent } from './version-checker/version-checker.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    PackageCleanerComponent,
    VersionCheckerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    LayoutModule,
    AppRoutingModule,
    NgxElectronModule,
    MatCardModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

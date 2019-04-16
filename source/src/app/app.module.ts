import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {AppRoutingModule} from './app-routing.module';
import { SummaryComponent } from './summary/summary.component';
import {UploadComponent} from './upload/upload.component';
import {ViewImagesComponent} from './view-images/view-images.component';
import {WebcamModule} from 'ngx-webcam';
import {DialogComponent} from './upload/dialog/dialog.component';
// import {UploadModule} from './upload/upload.module';
import {UploadService} from './upload/upload.service';
import {HttpClientModule} from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    UploadComponent,
    ViewImagesComponent,
    DialogComponent,
    ChartComponent
  ],
  entryComponents: [
    UploadComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatListModule,
    MatDialogModule,
    MatTableModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    WebcamModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }

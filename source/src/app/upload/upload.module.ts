import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UploadService} from './upload.service';
import {MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule} from '@angular/material';
import {UploadComponent} from './upload.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogComponent} from './dialog/dialog.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatListModule, HttpClientModule, BrowserAnimationsModule, MatProgressBarModule],
  declarations: [UploadComponent, DialogComponent],
  exports: [UploadComponent],
  entryComponents: [DialogComponent], // Add the DialogComponent as entry component
  providers: [UploadService]
})

export class UploadModule { }

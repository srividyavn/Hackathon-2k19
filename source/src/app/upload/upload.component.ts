import { Component, OnInit } from '@angular/core';
import {WebcamImage} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {DialogComponent} from './dialog/dialog.component';
import {MatDialog} from '@angular/material';
import {UploadService} from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public seconds: number;
  private trigger: Subject<void> = new Subject<void>();

  // latest snapshot
  public webcamImage: WebcamImage = null;

  constructor(public dialog: MatDialog, public uploadService: UploadService) { }

  ngOnInit() {
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;

  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public openUploadDialog() {
    const dialogRef = this.dialog.open(DialogComponent, { width: '50%', height: '50%' });
  }
}

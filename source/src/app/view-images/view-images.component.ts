import {HttpClient} from '@angular/common/http';

declare function require(path: string);

import { Component, OnInit } from '@angular/core';
import {WebcamImage} from 'ngx-webcam';

@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.component.html',
  styleUrls: ['./view-images.component.css']
})
export class ViewImagesComponent implements OnInit {

  public images: Array<any> = [];

  imageSrc: any;
  listImagesUrl = 'http://localhost:3000/getImages1';
  files: any;

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    this.getImages();
  }

  public getImages() {

    this.http.get(this.listImagesUrl).subscribe(data => {
      this.files = data;

      for ( const file of this.files) {
        const imageT = require('../../../backend/images_folder/' + file);
        this.images.push(imageT);
      }
    });
  }
}



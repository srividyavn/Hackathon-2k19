import {Component, OnInit} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-material-tab-router';
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Upload',
        link: './upload',
        index: 0
      }, {
        label: 'View Images',
        link: './viewImages',
        index: 1
      }, {
        label: 'Summary',
        link: './summary',
        index: 2
      }, {
      label: 'Chart',
        link: './chart',
        index: 3
      }
    ];
  }
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
}

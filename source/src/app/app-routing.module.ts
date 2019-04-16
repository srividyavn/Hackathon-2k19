import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {UploadComponent} from './upload/upload.component';
import {ViewImagesComponent} from './view-images/view-images.component';
import {SummaryComponent} from './summary/summary.component';
import {ChartComponent} from './chart/chart.component';
const routes: Routes = [
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
  { path: 'upload', component:  UploadComponent},
  { path: 'viewImages', component:  ViewImagesComponent},
  { path: 'summary', component: SummaryComponent},
  {path: 'chart', component: ChartComponent}
];
export const appRouting = RouterModule.forRoot(routes);
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }

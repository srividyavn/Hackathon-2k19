import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const categorizeUrl = 'http://localhost:3000/categorizeItems';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  displayedColumns: string[] = ['categories', 'amount'];
  categoriesData: any;
  dataSource = this.categoriesData;

  constructor(public http: HttpClient) { }

  ngOnInit() {

    this.categoriesData = [
      {categories: 'Food', amount: '5.69'},
      {categories: 'Entertainment', amount: '3.45'},
      {categories: 'Books', amount: '3.4'},
      {categories: 'Furniture', amount: '11.99'},
      {categories: 'Sports', amount: '0.67'}
    ];
    this.dataSource = this.categoriesData;
    // this.getCategories();
  }

  getCategories() {
    this.http.post(categorizeUrl, '').subscribe(data => {
      this.categoriesData = data;
    });
  }

}


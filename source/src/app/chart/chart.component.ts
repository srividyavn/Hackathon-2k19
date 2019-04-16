import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private httpService: HttpClient) { }

  // ADD CHART OPTIONS.
  pieChartOptions = {
    responsive: true
  };

  pieChartLabels =  ['Food', 'Entertainment', 'Books', 'Furniture', 'Sports'];

  // CHART COLOR.
  pieChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)'
      ]
    }
  ];

  pieChartData: any = [
    {
      data: [5, 3, 3, 11, 1]
    }
  ];

  ngOnInit() {
    this.httpService.get('../../backend/text_data/summary.json', {responseType: 'json'}).subscribe(
      data => {
        this.pieChartData = data as any [];	 // FILL THE CHART ARRAY WITH DATA.
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

  onChartClick(event) {
    console.log(event);
  }

}

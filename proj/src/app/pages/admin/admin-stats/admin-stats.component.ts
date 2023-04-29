import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.css']
})
export class AdminStatsComponent implements OnInit{
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };


  public monthsLabel = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public barChartLegend = true;

  public classifiedImages = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Fire-Classified Images'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Flood-Classified Images'}
  ];

  public fireSeverity  =  [
    {data: [15, 49, 20, 31, 25, 18, 10], label: 'Fire-Level(Low) '},
    {data: [45, 59, 80, 51, 56, 55, 32], label: 'Fire-Level(Medium) '},
    {data: [65, 90, 68, 81, 96, 60, 90], label: 'Fire-level(High) '},
    
  ];

  public floodSeverity  =  [
    {data: [25, 39, 20, 31, 25, 38, 40], label: 'Flood-Severity(Moderate) '},
    {data: [25, 19, 10, 11, 16, 15, 22], label: 'Flood-Severity(Significant) '},
    {data: [9, 10, 18, 11, 16, 21, 10], label: 'Flood-Severity(Severe) '},
    
  ];

  public mix: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;
  constructor() { }

  ngOnInit() {
  }
}

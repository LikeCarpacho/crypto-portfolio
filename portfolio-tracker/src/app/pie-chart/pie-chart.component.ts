import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import * as Highcharts from 'highcharts';
import { Tooltip } from 'highcharts/highcharts.src';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input() portfolio: { symbol: string; amount: number; usdPrice:number; editing:boolean }[] = [];

  Highcharts: typeof Highcharts = Highcharts;


  @Input() totalVal: number = 1;


  chartOptions: Highcharts.Options = {};

  constructor() {
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('cryptoData');

    if (storedData) {
      this.portfolio = JSON.parse(storedData);
    }

    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['portfolio']) {
      this.initChart();
    }
  }

  initChart(): void {
    const data = this.portfolio.map((crypto) => ({
      name: crypto.symbol,
      y: (crypto.amount * crypto.usdPrice),
      pect: (crypto.amount * crypto.usdPrice / this.totalVal) * 100,
      yString: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(crypto.amount * crypto.usdPrice)
    }));

    this.chartOptions = {
      chart: {
        type: 'pie',
        backgroundColor:''
      },
      title: {
        text: '',
      },
      series: [
        {
          type: 'pie',
          name: '$',
          data,
          colors:["#004c8c","#006a90","#4a6380","#3c8086","#3c3c80"]
        },
        
      ],
      tooltip:{
        pointFormat: '{point.yString} <b>({point.pect:.1f}%)</b>',
      },
      credits :{
        enabled:false
      }

    };
  }

  clearData(): void {
    localStorage.removeItem('cryptoData');
    this.portfolio = [];
    this.initChart();
  }
}

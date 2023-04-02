import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input() portfolio: { symbol: string; amount: number; usdPrice:number }[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  constructor() {
    HC_exporting(Highcharts);
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
      y: crypto.amount * crypto.usdPrice,
    }));

    this.chartOptions = {
      chart: {
        type: 'pie',
      },
      title: {
        text: '',
      },
      series: [
        {
          type: 'pie',
          name: '$',
          data,
        },
      ],
      exporting: {
        enabled: true,
      },
    };
  }

  clearData(): void {
    localStorage.removeItem('cryptoData');
    this.portfolio = [];
    this.initChart();
  }
}

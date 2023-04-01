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
    this.initChart();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['portfolio']) {
      this.initChart();
    }
  }

  initChart(): void {
    console.log(this.portfolio)
    const data = this.portfolio.map((crypto) => ({
      name: crypto.symbol,
      y: crypto.amount * crypto.usdPrice,
    }));

    this.chartOptions = {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Portfolio',
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
}

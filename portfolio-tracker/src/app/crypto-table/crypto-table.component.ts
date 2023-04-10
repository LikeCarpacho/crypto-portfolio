import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Add this import
import { response } from 'express';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-crypto-table',
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.scss']
})
export class CryptoTableComponent {
  
  @Input() portfolio: { symbol: string; amount: number; usdPrice: number; editing:boolean}[] = [];
  
  @Output() entryUpdated: EventEmitter<any> = new EventEmitter();
  
  @Output() entryDeleted = new EventEmitter<string>();
  
  graphLoading: boolean = true;

  constructor(private http: HttpClient) {} // Inject HttpClient

  showConfirmationDialog = false;

  editingActive: boolean = false;

  currentSort = {
    column: '',
    order: 'asc'
  };

  showModal: boolean = false;
  
  clickedAssetName: string = '';

  toggleModal() {
    this.showModal = !this.showModal;
  }

  openModal(assetName: string) {
    this.clickedAssetName = assetName;
    this.graphLoading = true;

    let graphData:any = {
      priceArray:[],
      timeArray:[]
    }

    this.http.get("https://crypto-prices-api-production.up.railway.app/graphData?name="+assetName.toLowerCase()).subscribe(
      (response:any)=>{
        response[0].prices.forEach((element:any) => {
          graphData['priceArray'].push(element.price);
          graphData['timeArray'].push(this.formatTimestamp(element.timestamp));
        });
        this.drawGraph(graphData);
        this.graphLoading = false;
      }
    )   
    this.toggleModal(); 

  }
  formatTimestamp(timestamp:any) {
    const date = new Date(timestamp);
    const now = new Date();
  
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
  
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
  
    return isToday ? `today at ${formattedTime}` : `${date.getDay()} at ${formattedTime}`;
  }
  
  drawGraph(graphData: any) {
    const options: Highcharts.Options = {
      chart: {
        type: 'line',
        renderTo: 'chartContainer',
        backgroundColor:'transparent'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: graphData['timeArray'],
        title: {
          text: ''
        },
        tickInterval:3,
        labels:{
          rotation:-20
        }
      },
      yAxis: {
        title: {
          text: 'Price'
        }
      },
      series: [
        {
          type: 'line',
          name: 'Price',
          data: graphData['priceArray'],
        }
      ],
      credits:{
        text:""
      },
      legend:{
        enabled:false
      }
    };
  
    Highcharts.chart(options);
  }
  
  deleteEntry(symbol: string) {
    this.entryDeleted.emit(symbol);
  }

  setSrc(event: Event){
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/cryptocurrency-icons/generic@2x.png';
  }

  deleteConfirmed(symbol: string) {
    this.showConfirmationDialog = false;
    this.deleteEntry(symbol);
  }

  deleteCancelled() {
    this.showConfirmationDialog = false;
  }

  showDeleteConfirmation() {
    this.showConfirmationDialog = true;
  }
  toggleEditing(index: number): void {
    if(this.portfolio[index].amount > 0){
      this.portfolio[index].editing = !this.portfolio[index].editing;
      this.editingActive = true;

      if (!this.portfolio[index].editing) {
        this.entryUpdated.emit(this.portfolio[index]);
        this.editingActive = false;
      }
      
  }
}
  //sort table based on col name
  sortTable(column: string) {
    if (this.currentSort.column === column) {
      this.currentSort.order = this.currentSort.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort.column = column;
      this.currentSort.order = 'asc';
    }

    this.portfolio.sort((a, b) => {
      let comparison = 0;

      if (column === 'totalValue') {
        const aValue = a.amount * a.usdPrice;
        const bValue = b.amount * b.usdPrice;
        comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        comparison = (a as any)[column] > (b as any)[column] ? 1 : (a as any)[column] < (b as any)[column] ? -1 : 0;
      }

      return this.currentSort.order === 'asc' ? comparison : -comparison;
    });
  }
}

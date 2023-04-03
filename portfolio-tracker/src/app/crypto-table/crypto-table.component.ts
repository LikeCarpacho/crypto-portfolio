import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-crypto-table',
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.scss']
})
export class CryptoTableComponent {
  
  @Input() portfolio: { symbol: string; amount: number; usdPrice: number;}[] = [];
  
  @Output() entryDeleted = new EventEmitter<string>();
  
  
  deleteEntry(symbol: string) {
    this.entryDeleted.emit(symbol);
  }
  currentSort = {
    column: '',
    order: 'asc'
  };

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

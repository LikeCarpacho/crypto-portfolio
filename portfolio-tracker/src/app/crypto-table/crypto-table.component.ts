import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-crypto-table',
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.scss']
})
export class CryptoTableComponent {
  
  @Input() portfolio: { symbol: string; amount: number; usdPrice: number; editing:boolean}[] = [];
  @Output() entryUpdated: EventEmitter<any> = new EventEmitter();
  @Output() entryDeleted = new EventEmitter<string>();
  showConfirmationDialog = false;

  editingActive: boolean = false;

  currentSort = {
    column: '',
    order: 'asc'
  };
  
  deleteEntry(symbol: string) {
    this.entryDeleted.emit(symbol);
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
    this.portfolio[index].editing = !this.portfolio[index].editing;
    this.editingActive = true;
    if (!this.portfolio[index].editing) {
      console.log("here")
      this.entryUpdated.emit(this.portfolio[index]);
      this.editingActive = false;

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

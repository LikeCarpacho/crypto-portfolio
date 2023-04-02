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
}

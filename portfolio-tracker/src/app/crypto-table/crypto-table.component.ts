import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-crypto-table',
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.scss']
})
export class CryptoTableComponent {
  
  @Input() portfolio: { symbol: string; amount: number; usdPrice: number;}[] = [];

}

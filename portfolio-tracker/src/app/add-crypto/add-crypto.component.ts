import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-add-crypto',
  templateUrl: './add-crypto.component.html',
  styleUrls: ['./add-crypto.component.scss'],
})
export class AddCryptoComponent implements OnInit {
  @Output() cryptoAdded = new EventEmitter<{ symbol: string; amount: number; usdPrice:number; }>();
  top100Cryptos: any[] = [];
  selectedCrypto: any;
  amountOwned: number = 0;
  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTop100Cryptos();
  }
 
  fetchTop100Cryptos(): void {
    let params = new HttpParams()
      .set('vs_currency', 'usd')
      .set('order', 'market_cap_desc')
      .set('per_page', '100')
      .set('page', '1')
      .set('sparkline', 'false');
  
    this.http
      .get('https://api.coingecko.com/api/v3/coins/markets', { params })
      .subscribe((data: any) => {
        this.top100Cryptos = data.map((coin: any) => coin);
          // Check if there's a saved crypto and amount owned in localStorage
      });

  }

  addCrypto(): void {
    this.cryptoAdded.emit({
      symbol: String(this.selectedCrypto.symbol).toUpperCase(),
      amount: this.amountOwned,
      usdPrice: this.selectedCrypto.current_price
    });
  
    this.selectedCrypto = null;
    this.amountOwned = 0;
  }
  
}

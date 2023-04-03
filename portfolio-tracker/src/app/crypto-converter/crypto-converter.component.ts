import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-crypto-converter',
  templateUrl: './crypto-converter.component.html',
  styleUrls: ['./crypto-converter.component.scss']
})
export class CryptoConverterComponent implements OnInit {
  @Input() top100Cryptos: any[] = [];
  selectedCrypto1 = '';
  selectedCrypto2 = '';
  amount1: number | null = null;
  amount2: number = 0;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['top100Cryptos'] && changes['top100Cryptos'].currentValue.length > 0) {
      this.selectedCrypto1 = this.top100Cryptos[0].id;
      this.selectedCrypto2 = this.top100Cryptos[1].id;
    }
  }

  calculateConversion(): void {
    if (this.selectedCrypto1 && this.selectedCrypto2 && this.amount1 !== null) {
      const crypto1 = this.top100Cryptos.find(crypto => crypto.id === this.selectedCrypto1);
      const crypto1Price = crypto1 ? crypto1.current_price : 0;
      const crypto2 = this.top100Cryptos.find(crypto => crypto.id === this.selectedCrypto2);
      const crypto2Price = crypto2 ? crypto2.current_price : 0;
      if (crypto1Price && crypto2Price) {
        this.amount2 = (this.amount1 * crypto1Price) / crypto2Price;
      }
    }
  }
  onCrypto1AmountChange(): void {
      this.calculateConversion();
  }
  onCrypto2AmountChange(): void {
    this.amount1 = (this.amount2 * this.top100Cryptos.find(crypto => crypto.id === this.selectedCrypto2).current_price) / this.top100Cryptos.find(crypto => crypto.id === this.selectedCrypto1).current_price;
  }
}

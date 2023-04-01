import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  portfolio: { symbol: string; amount: number; usdPrice: number;}[] = [];

  addToPortfolio(crypto: { symbol: string; amount: number; usdPrice: number; }): void {
    const existingCrypto = this.portfolio.find((c) => c.symbol === crypto.symbol);
    
    if (existingCrypto) {
      existingCrypto.amount += crypto.amount;
    } else {
      this.portfolio.push(crypto);
    }
  
    // Update the portfolio array with a new reference to trigger ngOnChanges
    this.portfolio = [...this.portfolio];
  }
  
}
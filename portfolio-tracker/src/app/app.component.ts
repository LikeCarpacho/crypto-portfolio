import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  portfolio: { symbol: string; amount: number; usdPrice: number;}[] = [];

  portfolioValue: number = 0;

  ngOnInit(){
    const storedData = localStorage.getItem('cryptoData');
    if (storedData) {
      this.portfolio = JSON.parse(storedData);
    }

    for(let i = 0;i<this.portfolio.length;i++){
      console.log(this.portfolio[i])
      this.portfolioValue += this.portfolio[i].amount * this.portfolio[i].usdPrice
    }
  }

  

  addToPortfolio(crypto: { symbol: string; amount: number; usdPrice: number; }): void {
    const existingCrypto = this.portfolio.find((c) => c.symbol === crypto.symbol);
    
    if (existingCrypto) {
      existingCrypto.amount += crypto.amount;
    } else {
      this.portfolio.push(crypto);
    }
    const storedData = localStorage.getItem('cryptoData');
  
    let cryptoData;
  
    if (storedData) {
      cryptoData = JSON.parse(storedData);
    } else {
      cryptoData = []; // Initialize cryptoData as an empty array when there's no stored data
    }
  
    const existingCryptoIndex = cryptoData.findIndex((c:any) => c.symbol ===  crypto.symbol);
  
    if (existingCryptoIndex !== -1) {
      cryptoData[existingCryptoIndex] = crypto;
    } else {
      cryptoData.push(crypto);
    }
  
    localStorage.setItem('cryptoData', JSON.stringify(cryptoData));
  
    // Update the portfolio array with a new reference to trigger ngOnChanges
    this.portfolio = [...this.portfolio];
  }
  
  clearData(): void {
    localStorage.removeItem('cryptoData');
    this.portfolio = [...[]];
  }
}
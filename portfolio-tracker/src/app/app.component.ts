import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  portfolio: { symbol: string; amount: number; usdPrice: number;}[] = [];

  portfolioValue: number = 0;


  showAddCrypto = false;

  onShowAddCryptoChanged(value: boolean): void {
    this.showAddCrypto = value;
  }

  ngOnInit(){
    const storedData = localStorage.getItem('cryptoData');
    if (storedData) {
      this.portfolio = JSON.parse(storedData);
    }
    this.updateTotalText();
    
  }
  //update portfolio values
  updateTotalText(){
    this.portfolioValue = 0;

    for(let i = 0;i<this.portfolio.length;i++){
      this.portfolioValue += this.portfolio[i].amount * this.portfolio[i].usdPrice
    }
  }
  //add new holding to global data structure portfolio
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

    this.updateTotalText();

    this.showAddCrypto = false;
  }
  //remove from local storage
  clearData(): void {

    localStorage.removeItem('cryptoData');
    //empty array
    this.portfolio = [...[]];
    this.updateTotalText();
  }
  //delete specific entry
  deleteEntry(symbol: string): void {
    const index = this.portfolio.findIndex((item) => item.symbol === symbol);
    if (index !== -1) {
      this.portfolio.splice(index, 1);

      const cryptoData = JSON.parse(localStorage.getItem('cryptoData') || '[]');
      const dataIndex = cryptoData.findIndex((item: any) => item.symbol === symbol);
      if (dataIndex !== -1) {
        cryptoData.splice(dataIndex, 1);
        localStorage.setItem('cryptoData', JSON.stringify(cryptoData));
      }

      this.portfolio = [...this.portfolio];
    }
  }
}
import { Component, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Add this import
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  portfolio: { symbol: string; amount: number; usdPrice: number; editing:boolean}[] = [];

  portfolioValue: number = 0;

  lastUpdated: string = "";


  showAddCrypto = false;
  
  constructor(private http: HttpClient) {} // Inject HttpClient

  // ...

  fetchTop100Cryptos(): Observable<any> {
    let params = new HttpParams()
      .set('vs_currency', 'usd')
      .set('order', 'market_cap_desc')
      .set('per_page', '100')
      .set('page', '1')
      .set('sparkline', 'false');
  
    return this.http.get('https://api.coingecko.com/api/v3/coins/markets', { params });
  }

  updateCryptoPrices(): void {
    this.fetchTop100Cryptos().subscribe((data: any) => {
      data.forEach((coin: any) => {
        const existingCryptoIndex = this.portfolio.findIndex((c) => c.symbol.toLowerCase() === coin.symbol.toLowerCase());
        if (existingCryptoIndex !== -1) {
          this.portfolio[existingCryptoIndex].usdPrice = coin.current_price;
          // Update localStorage
          const storedData = localStorage.getItem('cryptoData');
          let cryptoData = storedData ? JSON.parse(storedData) : [];
          cryptoData[existingCryptoIndex].usdPrice = coin.current_price;
          localStorage.setItem('cryptoData', JSON.stringify(cryptoData));
        }
      });

      this.portfolio = [...this.portfolio];
      this.updateTotalText();
      this.formatCurrentTime();
    });
  }
  onShowAddCryptoChanged(value: boolean): void {
    this.showAddCrypto = value;
  }
  formatCurrentTime() {
    const currentTime = new Date();
  
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const amPm = currentHours >= 12 ? 'PM' : 'AM';
    const hours12 = currentHours % 12 || 12;
  
    this.lastUpdated = `Last updated: Today at ${hours12}:${currentMinutes.toString().padStart(2, '0')} ${amPm}`;
  }
  ngOnInit(){
    
    // Call updateCryptoPrices initially
    this.updateCryptoPrices(); 
    
    // Call updateCryptoPrices every 15 minutes
    
    setInterval(() => {
      this.updateCryptoPrices(); 
    },7 * 60 * 1000);

    const storedData = localStorage.getItem('cryptoData');
    
    if (storedData) {
      this.portfolio = JSON.parse(storedData).map((item: any) => ({ ...item, editing: false }));
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
  addToPortfolio(crypto: { symbol: string; amount: number; usdPrice: number; editing: boolean}): void {
    const existingCrypto = this.portfolio.find((c) => c.symbol === crypto.symbol);
    
    if (existingCrypto) {
      existingCrypto.amount += crypto.amount;
    } else {
      this.portfolio.push({ ...crypto, editing: false });
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
    this.portfolio = [];
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
      this.updateTotalText();

    }
  }
  //update entry
  updateHolding(updatedCrypto: { symbol: string; amount: number; usdPrice: number; editing:boolean }): void {
    const existingCryptoIndex = this.portfolio.findIndex((c) => c.symbol === updatedCrypto.symbol);
    
    if (existingCryptoIndex !== -1) {
      this.portfolio[existingCryptoIndex] = updatedCrypto;
      const storedData = localStorage.getItem('cryptoData');
      let cryptoData = storedData ? JSON.parse(storedData) : [];
      cryptoData[existingCryptoIndex] = updatedCrypto;
      localStorage.setItem('cryptoData', JSON.stringify(cryptoData));
      console.log(this.portfolio)
    } else {
      console.error('Crypto not found in portfolio');
    }

    this.portfolio = [...this.portfolio];
    this.updateTotalText();


  }

  closeModal(){
    this.showAddCrypto = false;
  }
  
}
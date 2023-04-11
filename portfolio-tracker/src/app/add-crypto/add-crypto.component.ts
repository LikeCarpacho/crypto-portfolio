import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-add-crypto',
  templateUrl: './add-crypto.component.html',
  styleUrls: ['./add-crypto.component.scss'],
})
export class AddCryptoComponent implements OnInit {


  @Output() cryptoAdded = new EventEmitter<{ symbol: string; amount: number; usdPrice:number; editing:boolean;}>();

  @Output() showModal = new EventEmitter<void>;

  top100Cryptos: any[] = [];
  selectedCrypto: any;
  amountOwned: number = 0;
  searchQuery: string = '';

  constructor(private http: HttpClient) {
    this.fetchTop100Cryptos();
  }

  ngOnInit(): void {
    this.fetchTop100Cryptos();
  }

  fetchTop100Cryptos(): void {
  
    this.http
      .get('https://crypto-prices-api-production.up.railway.app/prices')
      .subscribe((data: any) => {
        this.top100Cryptos = data.map((coin: any) => coin);
      });

  }

  addCrypto(): void {

    if(this.amountOwned < 0){
      this.selectedCrypto = null;
      this.amountOwned = 0;
      return;
    }
    this.cryptoAdded.emit({
      symbol: String(this.selectedCrypto.symbol).toUpperCase(),
      amount: this.amountOwned,
      usdPrice: this.selectedCrypto.prices[0].price,
      editing:false
    });
    
    
  }
  //clode modal on succesful emit
  closeModal() {
    console.log("in add-crypto")
    this.showModal.emit();
  }
}

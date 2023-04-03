import { Component } from '@angular/core';

@Component({
  selector: 'app-update-holding',
  templateUrl: './update-holding.component.html',
  styleUrls: ['./update-holding.component.scss']
})
export class UpdateHoldingComponent {
  addCrypto() {
    throw new Error('Method not implemented.');
  }
  top100Cryptos: any;
  selectedCrypto: any;
  amountOwned: any;

}

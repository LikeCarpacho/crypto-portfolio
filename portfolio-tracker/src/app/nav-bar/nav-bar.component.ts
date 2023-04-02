import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  dropdownVisible: boolean = false;

  @Output() showAddCryptoChanged = new EventEmitter<boolean>();

  @Output() clearDataEvent = new EventEmitter<void>();

  // Call this function when you want to emit the event
  updateShowAddCrypto(value: boolean): void {
    this.showAddCryptoChanged.emit(value);
  }
}

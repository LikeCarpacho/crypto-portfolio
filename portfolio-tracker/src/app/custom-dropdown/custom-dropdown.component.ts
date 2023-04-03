import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent implements OnInit {
  @Input() items: any[] = [];
  @Output() selectedItem = new EventEmitter<any>();
  isOpen = false;
  selected: { symbol: string; name: string; } = {
    symbol: '',
    name: '',
  };

  ngOnInit() {
    if (this.items.length > 0) {
      this.selected = this.items[0];
    }
    else {
      this.selected.name = "Select Option";
      this.selected.symbol = "$ABC"
    }
  }



  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: any) {
    console.log(this.items)
    this.selected = item;
    this.selectedItem.emit(item);
    this.isOpen = false;
  }
}

import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent implements OnInit {
  @Input() items: any[] = [];
  @Output() selectedItem = new EventEmitter<any>();

  filteredItems: any[] = [];

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
  filterItems(searchText: string) {
    if(searchText !== ""){
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) || item.symbol.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.filteredItems = [...this.items];
    }
  }



  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.filteredItems = [...this.items];

  }

  selectItem(item: any) {
    this.selected = item;
    this.selectedItem.emit(item);
    this.isOpen = false;
  }
}

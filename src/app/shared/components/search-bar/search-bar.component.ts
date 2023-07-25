import { Component } from '@angular/core';

@Component({
  selector: 'SearchBar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  placeholder = 'ค้นหาโพสต์ แท็ก หรือผู้คน';
  isSearching = false;
  openPanel() {
    this.isSearching = true;
  }
  closePanel() {
    this.isSearching = false;
  }
}

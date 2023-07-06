import { Component } from '@angular/core';

@Component({
  selector: 'SearchBar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  placeHolder = 'ค้นหาทุกสิ่งทุกอย่าง...'
  searchData = 'Item'
}
